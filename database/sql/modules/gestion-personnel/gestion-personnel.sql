-- ====================================================
-- MODULE : GESTION DU PERSONNEL
-- Description : Tables pour la gestion complète du personnel
-- ====================================================

\c rh; -- se connecter à la base rh

-- ====================================================
-- 1. POSTES ET FONCTIONS
-- ====================================================

-- Table des postes disponibles dans l'entreprise
CREATE TABLE postes (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    intitule VARCHAR(150) NOT NULL,
    description TEXT,
    departement_id INT REFERENCES departements(id) ON DELETE SET NULL,
    niveau_hierarchique INT DEFAULT 1, -- 1=opérationnel, 2=superviseur, 3=manager, 4=directeur
    salaire_min DECIMAL(10,2),
    salaire_max DECIMAL(10,2),
    competences_requises TEXT,
    statut VARCHAR(50) DEFAULT 'actif' CHECK (statut IN ('actif', 'inactif')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ====================================================
-- 2. INFORMATIONS DÉTAILLÉES DES EMPLOYÉS
-- ====================================================

-- Extension de la table employes avec informations complètes
CREATE TABLE employes_details (
    id SERIAL PRIMARY KEY,
    employe_id INT UNIQUE REFERENCES employes(id) ON DELETE CASCADE,
    
    -- Informations personnelles
    photo_path VARCHAR(255),
    telephone VARCHAR(20),
    telephone_mobile VARCHAR(20),
    adresse TEXT,
    ville VARCHAR(100),
    code_postal VARCHAR(10),
    pays VARCHAR(100) DEFAULT 'Madagascar',
    
    -- Situation familiale
    situation_familiale VARCHAR(50) CHECK (situation_familiale IN ('celibataire', 'marie', 'divorce', 'veuf')),
    nombre_enfants INT DEFAULT 0,
    
    -- Informations administratives
    cin VARCHAR(50),
    date_delivrance_cin DATE,
    lieu_delivrance_cin VARCHAR(100),
    nationalite VARCHAR(100) DEFAULT 'Malagasy',
    lieu_naissance VARCHAR(150),
    
    -- Informations bancaires
    banque VARCHAR(100),
    numero_compte VARCHAR(50),
    rib VARCHAR(50),
    
    -- Sécurité sociale
    numero_cnaps VARCHAR(50),
    numero_ostie VARCHAR(50),
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ====================================================
-- 3. AFFECTATION DES POSTES
-- ====================================================

-- Affectation actuelle de l'employé à un poste
CREATE TABLE employes_postes (
    id SERIAL PRIMARY KEY,
    employe_id INT REFERENCES employes(id) ON DELETE CASCADE,
    poste_id INT REFERENCES postes(id) ON DELETE SET NULL,
    date_debut DATE NOT NULL DEFAULT CURRENT_DATE,
    date_fin DATE,
    salaire DECIMAL(10,2),
    type_affectation VARCHAR(50) DEFAULT 'permanent' CHECK (type_affectation IN ('permanent', 'interim', 'mission')),
    est_actuel BOOLEAN DEFAULT TRUE,
    motif_fin TEXT, -- démission, licenciement, fin de contrat, promotion, etc.
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Contrainte : un seul poste actuel par employé
    CONSTRAINT unique_poste_actuel UNIQUE (employe_id, est_actuel) 
        DEFERRABLE INITIALLY DEFERRED
);

-- Index pour recherche rapide du poste actuel
CREATE INDEX idx_employes_postes_actuel ON employes_postes(employe_id, est_actuel) WHERE est_actuel = TRUE;

-- ====================================================
-- 4. HISTORIQUE DES MOUVEMENTS (Promotions, Mobilités)
-- ====================================================

CREATE TABLE historique_mouvements (
    id SERIAL PRIMARY KEY,
    employe_id INT REFERENCES employes(id) ON DELETE CASCADE,
    type_mouvement VARCHAR(50) NOT NULL CHECK (type_mouvement IN ('promotion', 'mutation', 'retrogradation', 'changement_departement')),
    
    -- Ancien poste
    ancien_poste_id INT REFERENCES postes(id) ON DELETE SET NULL,
    ancien_departement_id INT REFERENCES departements(id) ON DELETE SET NULL,
    ancien_salaire DECIMAL(10,2),
    
    -- Nouveau poste
    nouveau_poste_id INT REFERENCES postes(id) ON DELETE SET NULL,
    nouveau_departement_id INT REFERENCES departements(id) ON DELETE SET NULL,
    nouveau_salaire DECIMAL(10,2),
    
    date_mouvement DATE NOT NULL DEFAULT CURRENT_DATE,
    motif TEXT,
    valideur_id INT REFERENCES users(id) ON DELETE SET NULL, -- RH ou manager qui a validé
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ====================================================
-- 5. DOCUMENTS RH
-- ====================================================

CREATE TABLE types_documents (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    libelle VARCHAR(150) NOT NULL,
    description TEXT,
    obligatoire BOOLEAN DEFAULT FALSE,
    validite_jours INT, -- NULL si pas de date d'expiration
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Documents attachés aux employés
CREATE TABLE employes_documents (
    id SERIAL PRIMARY KEY,
    employe_id INT REFERENCES employes(id) ON DELETE CASCADE,
    type_document_id INT REFERENCES types_documents(id) ON DELETE CASCADE,
    numero_document VARCHAR(100),
    date_emission DATE,
    date_expiration DATE,
    fichier_path VARCHAR(255),
    statut VARCHAR(50) DEFAULT 'valide' CHECK (statut IN ('valide', 'expire', 'en_attente')),
    remarques TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index pour alertes de documents expirés
CREATE INDEX idx_documents_expiration ON employes_documents(date_expiration, statut) WHERE statut = 'valide';

-- ====================================================
-- 6. PERSONNES À CONTACTER EN CAS D'URGENCE
-- ====================================================

CREATE TABLE contacts_urgence (
    id SERIAL PRIMARY KEY,
    employe_id INT REFERENCES employes(id) ON DELETE CASCADE,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    relation VARCHAR(50), -- conjoint, parent, ami, etc.
    telephone VARCHAR(20) NOT NULL,
    telephone_mobile VARCHAR(20),
    adresse TEXT,
    priorite INT DEFAULT 1, -- 1=principal, 2=secondaire
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ====================================================
-- 7. NOTES ET OBSERVATIONS RH
-- ====================================================

CREATE TABLE notes_rh (
    id SERIAL PRIMARY KEY,
    employe_id INT REFERENCES employes(id) ON DELETE CASCADE,
    auteur_id INT REFERENCES users(id) ON DELETE SET NULL,
    type_note VARCHAR(50) CHECK (type_note IN ('observation', 'avertissement', 'felicitation', 'autre')),
    titre VARCHAR(150),
    contenu TEXT NOT NULL,
    date_note DATE DEFAULT CURRENT_DATE,
    confidentiel BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ====================================================
-- 8. DONNÉES DE RÉFÉRENCE INITIALES
-- ====================================================

-- Types de documents courants
INSERT INTO types_documents (code, libelle, description, obligatoire, validite_jours) VALUES
('CIN', 'Carte d''Identité Nationale', 'Document d''identité obligatoire', TRUE, NULL),
('DIPLOME', 'Diplôme', 'Diplôme académique ou professionnel', TRUE, NULL),
('CV', 'Curriculum Vitae', 'CV du candidat', TRUE, NULL),
('EXTRAIT_NAISSANCE', 'Extrait de naissance', 'Acte de naissance', TRUE, NULL),
('CASIER_JUDICIAIRE', 'Casier judiciaire', 'Bulletin n°3 du casier judiciaire', TRUE, 180),
('CERTIFICAT_MEDICAL', 'Certificat médical', 'Certificat médical d''aptitude', TRUE, 365),
('ATTESTATION_TRAVAIL', 'Attestation de travail', 'Attestation des anciens employeurs', FALSE, NULL),
('PHOTO_IDENTITE', 'Photo d''identité', 'Photo d''identité récente', TRUE, NULL),
('RIB', 'Relevé d''Identité Bancaire', 'RIB pour virement salaire', TRUE, NULL),
('CERTIFICAT_RESIDENCE', 'Certificat de résidence', 'Justificatif de domicile', FALSE, 180);

-- ====================================================
-- 9. VUES UTILES
-- ====================================================

-- Vue complète des employés avec leur poste actuel
CREATE OR REPLACE VIEW v_employes_complets AS
SELECT 
    e.id,
    e.matricule,
    c.nom,
    c.prenom,
    c.email,
    c.date_naissance,
    ed.telephone,
    ed.telephone_mobile,
    ed.adresse,
    ed.ville,
    ed.situation_familiale,
    ed.photo_path,
    p.intitule AS poste_actuel,
    p.code AS code_poste,
    d.nom AS departement,
    ep.salaire AS salaire_actuel,
    ep.date_debut AS date_debut_poste,
    ct.type_contrat,
    ct.date_debut AS date_debut_contrat,
    ct.date_fin AS date_fin_contrat,
    e.date_embauche,
    e.statut AS statut_employe,
    ed.numero_cnaps,
    ed.numero_ostie
FROM employes e
LEFT JOIN candidats c ON e.candidat_id = c.id
LEFT JOIN employes_details ed ON e.id = ed.employe_id
LEFT JOIN employes_postes ep ON e.id = ep.employe_id AND ep.est_actuel = TRUE
LEFT JOIN postes p ON ep.poste_id = p.id
LEFT JOIN departements d ON p.departement_id = d.id
LEFT JOIN contrats ct ON e.contrat_id = ct.id
WHERE e.statut = 'actif';

-- Vue des documents expirés ou à expirer
CREATE OR REPLACE VIEW v_documents_a_renouveler AS
SELECT 
    ed.id,
    e.matricule,
    c.nom,
    c.prenom,
    td.libelle AS type_document,
    ed.numero_document,
    ed.date_expiration,
    CASE 
        WHEN ed.date_expiration < CURRENT_DATE THEN 'Expiré'
        WHEN ed.date_expiration <= CURRENT_DATE + INTERVAL '30 days' THEN 'À renouveler'
        ELSE 'Valide'
    END AS statut_alerte
FROM employes_documents ed
JOIN employes e ON ed.employe_id = e.id
JOIN candidats c ON e.candidat_id = c.id
JOIN types_documents td ON ed.type_document_id = td.id
WHERE ed.date_expiration IS NOT NULL
  AND ed.statut = 'valide'
  AND ed.date_expiration <= CURRENT_DATE + INTERVAL '60 days'
ORDER BY ed.date_expiration;

-- ====================================================
-- 10. TRIGGERS
-- ====================================================

-- Fonction pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Appliquer le trigger sur les tables concernées
CREATE TRIGGER update_postes_updated_at BEFORE UPDATE ON postes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_employes_details_updated_at BEFORE UPDATE ON employes_details
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_employes_postes_updated_at BEFORE UPDATE ON employes_postes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_employes_documents_updated_at BEFORE UPDATE ON employes_documents
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contacts_urgence_updated_at BEFORE UPDATE ON contacts_urgence
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_notes_rh_updated_at BEFORE UPDATE ON notes_rh
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Fonction pour créer automatiquement l'historique lors d'un changement de poste
CREATE OR REPLACE FUNCTION create_historique_mouvement()
RETURNS TRIGGER AS $$
DECLARE
    v_ancien_poste_id INT;
    v_ancien_departement_id INT;
    v_ancien_salaire DECIMAL(10,2);
BEGIN
    -- Récupérer l'ancien poste actuel
    SELECT poste_id, salaire INTO v_ancien_poste_id, v_ancien_salaire
    FROM employes_postes
    WHERE employe_id = NEW.employe_id 
      AND est_actuel = TRUE 
      AND id != NEW.id;
    
    -- Si un ancien poste existe, créer l'historique
    IF v_ancien_poste_id IS NOT NULL THEN
        -- Récupérer le département de l'ancien poste
        SELECT departement_id INTO v_ancien_departement_id
        FROM postes WHERE id = v_ancien_poste_id;
        
        -- Insérer dans l'historique
        INSERT INTO historique_mouvements (
            employe_id,
            type_mouvement,
            ancien_poste_id,
            ancien_departement_id,
            ancien_salaire,
            nouveau_poste_id,
            nouveau_departement_id,
            nouveau_salaire,
            date_mouvement
        )
        SELECT 
            NEW.employe_id,
            CASE 
                WHEN NEW.salaire > v_ancien_salaire THEN 'promotion'
                WHEN p_new.departement_id != v_ancien_departement_id THEN 'mutation'
                ELSE 'changement_departement'
            END,
            v_ancien_poste_id,
            v_ancien_departement_id,
            v_ancien_salaire,
            NEW.poste_id,
            p_new.departement_id,
            NEW.salaire,
            NEW.date_debut
        FROM postes p_new
        WHERE p_new.id = NEW.poste_id;
        
        -- Désactiver l'ancien poste
        UPDATE employes_postes 
        SET est_actuel = FALSE, date_fin = NEW.date_debut
        WHERE employe_id = NEW.employe_id 
          AND est_actuel = TRUE 
          AND id != NEW.id;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_historique_mouvement 
    AFTER INSERT ON employes_postes
    FOR EACH ROW 
    WHEN (NEW.est_actuel = TRUE)
    EXECUTE FUNCTION create_historique_mouvement();

-- Fonction pour mettre à jour le statut des documents expirés
CREATE OR REPLACE FUNCTION update_document_status()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.date_expiration < CURRENT_DATE AND NEW.statut = 'valide' THEN
        NEW.statut = 'expire';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_document_expiration 
    BEFORE UPDATE ON employes_documents
    FOR EACH ROW 
    EXECUTE FUNCTION update_document_status();

-- ====================================================
-- FIN DU SCRIPT
-- ====================================================

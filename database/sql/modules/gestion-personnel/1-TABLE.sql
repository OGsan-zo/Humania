-- ====================================================
-- MODULE : GESTION DU PERSONNEL
-- Fichier : 1-TABLE.sql
-- Description : Création des tables pour la gestion du personnel
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
    statut_id INT REFERENCES ref_statut_poste(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ====================================================
-- 2. CARTE D'IDENTITÉ NATIONALE (CIN)
-- ====================================================

CREATE TABLE cin (
    id SERIAL PRIMARY KEY,
    numero_cin VARCHAR(50) UNIQUE NOT NULL,
    date_delivrance DATE,
    lieu_delivrance VARCHAR(100),
    lieu_naissance VARCHAR(150),
    nationalite VARCHAR(100) DEFAULT 'Malagasy',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ====================================================
-- 3. COMPTES BANCAIRES
-- ====================================================

CREATE TABLE comptes_bancaires (
    id SERIAL PRIMARY KEY,
    numero_compte VARCHAR(50) UNIQUE NOT NULL,
    banque_id INT REFERENCES ref_banques(id) ON DELETE SET NULL,
    rib VARCHAR(50),
    titulaire VARCHAR(150),
    type_compte_id INT REFERENCES ref_type_compte(id) ON DELETE SET NULL,
    statut_id INT REFERENCES ref_statut_compte(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ====================================================
-- 4. INFORMATIONS DÉTAILLÉES DES EMPLOYÉS
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
    
    -- Situation familiale (référence)
    situation_familiale_id INT REFERENCES ref_situation_familiale(id) ON DELETE SET NULL,
    nombre_enfants INT DEFAULT 0,
    
    -- Informations administratives (référence)
    cin_id INT REFERENCES cin(id) ON DELETE SET NULL,
    
    -- Informations bancaires (référence)
    compte_bancaire_id INT REFERENCES comptes_bancaires(id) ON DELETE SET NULL,
    
    -- Sécurité sociale
    numero_cnaps VARCHAR(50),
    numero_ostie VARCHAR(50),
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ====================================================
-- 5. AFFECTATION DES POSTES
-- ====================================================

-- Affectation actuelle de l'employé à un poste
CREATE TABLE employes_postes (
    id SERIAL PRIMARY KEY,
    employe_id INT REFERENCES employes(id) ON DELETE CASCADE,
    poste_id INT REFERENCES postes(id) ON DELETE SET NULL,
    date_debut DATE NOT NULL DEFAULT CURRENT_DATE,
    date_fin DATE,
    salaire DECIMAL(10,2),
    type_affectation_id INT REFERENCES ref_type_affectation(id) ON DELETE SET NULL,
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
-- 6. HISTORIQUE DES MOUVEMENTS (Promotions, Mobilités)
-- ====================================================

CREATE TABLE historique_mouvements (
    id SERIAL PRIMARY KEY,
    employe_id INT REFERENCES employes(id) ON DELETE CASCADE,
    type_mouvement_id INT REFERENCES ref_type_mouvement(id) ON DELETE SET NULL,
    
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
-- 7. DOCUMENTS RH
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
    statut_id INT REFERENCES ref_statut_document(id) ON DELETE SET NULL,
    remarques TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index pour alertes de documents expirés
CREATE INDEX idx_documents_expiration ON employes_documents(date_expiration, statut_id);

-- ====================================================
-- 8. PERSONNES À CONTACTER EN CAS D'URGENCE
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
-- 9. NOTES ET OBSERVATIONS RH
-- ====================================================

CREATE TABLE notes_rh (
    id SERIAL PRIMARY KEY,
    employe_id INT REFERENCES employes(id) ON DELETE CASCADE,
    auteur_id INT REFERENCES users(id) ON DELETE SET NULL,
    type_note_id INT REFERENCES ref_type_note(id) ON DELETE SET NULL,
    titre VARCHAR(150),
    contenu TEXT NOT NULL,
    date_note DATE DEFAULT CURRENT_DATE,
    confidentiel BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ====================================================
-- FIN DU FICHIER 1-TABLE.sql
-- ====================================================

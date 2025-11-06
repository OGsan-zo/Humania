-- ====================================================
-- MODULE : GESTION DU PERSONNEL
-- Fichier : 2-VUE.sql
-- Description : Vues pour faciliter les requêtes
-- ====================================================

\c rh; -- se connecter à la base rh

-- ====================================================
-- 1. VUE COMPLÈTE DES EMPLOYÉS
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
    rsf.libelle AS situation_familiale,
    ed.nombre_enfants,
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
    -- Informations CIN
    cin.numero_cin,
    cin.lieu_naissance,
    cin.nationalite,
    -- Informations bancaires
    cb.numero_compte,
    rb.nom AS banque,
    cb.rib,
    -- Sécurité sociale
    ed.numero_cnaps,
    ed.numero_ostie
FROM employes e
LEFT JOIN candidats c ON e.candidat_id = c.id
LEFT JOIN employes_details ed ON e.id = ed.employe_id
LEFT JOIN ref_situation_familiale rsf ON ed.situation_familiale_id = rsf.id
LEFT JOIN cin ON ed.cin_id = cin.id
LEFT JOIN comptes_bancaires cb ON ed.compte_bancaire_id = cb.id
LEFT JOIN ref_banques rb ON cb.banque_id = rb.id
LEFT JOIN employes_postes ep ON e.id = ep.employe_id AND ep.est_actuel = TRUE
LEFT JOIN postes p ON ep.poste_id = p.id
LEFT JOIN departements d ON p.departement_id = d.id
LEFT JOIN contrats ct ON e.contrat_id = ct.id
WHERE e.statut = 'actif';

-- ====================================================
-- 2. VUE DES DOCUMENTS À RENOUVELER
-- ====================================================

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
-- FIN DU FICHIER 2-VUE.sql
-- ====================================================

-- ====================================================
-- MODULE : GESTION DU PERSONNEL
-- Fichier : 4-DATA.sql
-- Description : Données de référence initiales
-- ====================================================

\c rh; -- se connecter à la base rh

-- ====================================================
-- 1. SITUATION FAMILIALE
-- ====================================================

INSERT INTO ref_situation_familiale (code, libelle, description) VALUES
('CELIBATAIRE', 'Célibataire', 'Personne non mariée'),
('MARIE', 'Marié(e)', 'Personne mariée'),
('DIVORCE', 'Divorcé(e)', 'Personne divorcée'),
('VEUF', 'Veuf(ve)', 'Personne veuve'),
('CONCUBINAGE', 'Concubinage', 'Personne en concubinage'),
('PACSE', 'Pacsé(e)', 'Personne pacsée');

-- ====================================================
-- 2. TYPES DE NOTES RH
-- ====================================================

INSERT INTO ref_type_note (code, libelle, description) VALUES
('OBSERVATION', 'Observation', 'Note d''observation générale'),
('AVERTISSEMENT', 'Avertissement', 'Avertissement disciplinaire'),
('FELICITATION', 'Félicitation', 'Félicitation pour performance'),
('SANCTION', 'Sanction', 'Sanction disciplinaire'),
('REMARQUE', 'Remarque', 'Remarque sur le comportement'),
('AUTRE', 'Autre', 'Autre type de note');

-- ====================================================
-- 3. BANQUES DE MADAGASCAR
-- ====================================================

INSERT INTO ref_banques (code, nom, sigle) VALUES
('BNI', 'BNI Madagascar', 'BNI'),
('BFV', 'Banky Foiben''i Madagasikara', 'BFV-SG'),
('BOA', 'Bank Of Africa Madagascar', 'BOA'),
('BMOI', 'Banque Malgache de l''Océan Indien', 'BMOI'),
('ACCESMAD', 'Accès Banque Madagascar', 'ACCESMAD'),
('SIPEM', 'Société d''Investissement pour la Promotion de l''Entreprise à Madagascar', 'SIPEM'),
('PAOSITRA', 'Paositra Money', 'PAOSITRA'),
('MCB', 'Mauritius Commercial Bank', 'MCB');

-- ====================================================
-- 4. TYPES DE DOCUMENTS RH
-- ====================================================

-- Insertion des types de documents courants
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
-- 5. REMARQUES
-- ====================================================
-- Les données ci-dessus sont des données de référence.
-- Elles peuvent être modifiées selon les besoins de l'entreprise.

-- ====================================================
-- FIN DU FICHIER 4-DATA.sql
-- ====================================================

-- ====================================================
-- MODULE : GESTION DU PERSONNEL
-- Fichier : 0-REFERENCE.sql
-- Description : Tables de référence pour la normalisation
-- ====================================================

\c rh; -- se connecter à la base rh

-- ====================================================
-- 1. RÉFÉRENCE : SITUATION FAMILIALE
-- ====================================================

CREATE TABLE ref_situation_familiale (
    id SERIAL PRIMARY KEY,
    code VARCHAR(20) UNIQUE NOT NULL,
    libelle VARCHAR(50) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ====================================================
-- 2. RÉFÉRENCE : TYPE DE NOTE RH
-- ====================================================

CREATE TABLE ref_type_note (
    id SERIAL PRIMARY KEY,
    code VARCHAR(20) UNIQUE NOT NULL,
    libelle VARCHAR(50) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ====================================================
-- 3. RÉFÉRENCE : BANQUES
-- ====================================================

CREATE TABLE ref_banques (
    id SERIAL PRIMARY KEY,
    code VARCHAR(20) UNIQUE NOT NULL,
    nom VARCHAR(150) NOT NULL,
    sigle VARCHAR(50),
    adresse TEXT,
    telephone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ====================================================
-- 4. RÉFÉRENCE : STATUT DES POSTES
-- ====================================================

CREATE TABLE ref_statut_poste (
    id SERIAL PRIMARY KEY,
    code VARCHAR(20) UNIQUE NOT NULL,
    libelle VARCHAR(50) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ====================================================
-- 5. RÉFÉRENCE : TYPE DE COMPTE BANCAIRE
-- ====================================================

CREATE TABLE ref_type_compte (
    id SERIAL PRIMARY KEY,
    code VARCHAR(20) UNIQUE NOT NULL,
    libelle VARCHAR(50) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ====================================================
-- 6. RÉFÉRENCE : STATUT DES COMPTES BANCAIRES
-- ====================================================

CREATE TABLE ref_statut_compte (
    id SERIAL PRIMARY KEY,
    code VARCHAR(20) UNIQUE NOT NULL,
    libelle VARCHAR(50) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ====================================================
-- 7. RÉFÉRENCE : TYPE D'AFFECTATION
-- ====================================================

CREATE TABLE ref_type_affectation (
    id SERIAL PRIMARY KEY,
    code VARCHAR(20) UNIQUE NOT NULL,
    libelle VARCHAR(50) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ====================================================
-- 8. RÉFÉRENCE : TYPE DE MOUVEMENT
-- ====================================================

CREATE TABLE ref_type_mouvement (
    id SERIAL PRIMARY KEY,
    code VARCHAR(20) UNIQUE NOT NULL,
    libelle VARCHAR(50) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE ref_type_mouvement 
ALTER COLUMN code TYPE VARCHAR(30);

-- ====================================================
-- 9. RÉFÉRENCE : STATUT DES DOCUMENTS
-- ====================================================

CREATE TABLE ref_statut_document (
    id SERIAL PRIMARY KEY,
    code VARCHAR(20) UNIQUE NOT NULL,
    libelle VARCHAR(50) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

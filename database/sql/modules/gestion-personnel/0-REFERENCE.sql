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

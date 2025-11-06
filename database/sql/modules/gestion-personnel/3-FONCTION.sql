-- ====================================================
-- MODULE : GESTION DU PERSONNEL
-- Fichier : 3-FONCTION.sql
-- Description : Fonctions et triggers pour l'automatisation
-- ====================================================

\c rh; -- se connecter à la base rh

-- ====================================================
-- 1. FONCTION : Mise à jour automatique de updated_at
-- ====================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ====================================================
-- 2. TRIGGERS : Application de update_updated_at
-- ====================================================

-- Trigger sur la table postes
CREATE TRIGGER update_postes_updated_at 
    BEFORE UPDATE ON postes
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger sur la table employes_details
CREATE TRIGGER update_employes_details_updated_at 
    BEFORE UPDATE ON employes_details
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger sur la table employes_postes
CREATE TRIGGER update_employes_postes_updated_at 
    BEFORE UPDATE ON employes_postes
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger sur la table employes_documents
CREATE TRIGGER update_employes_documents_updated_at 
    BEFORE UPDATE ON employes_documents
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger sur la table contacts_urgence
CREATE TRIGGER update_contacts_urgence_updated_at 
    BEFORE UPDATE ON contacts_urgence
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger sur la table notes_rh
CREATE TRIGGER update_notes_rh_updated_at 
    BEFORE UPDATE ON notes_rh
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger sur la table cin
CREATE TRIGGER update_cin_updated_at 
    BEFORE UPDATE ON cin
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger sur la table comptes_bancaires
CREATE TRIGGER update_comptes_bancaires_updated_at 
    BEFORE UPDATE ON comptes_bancaires
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- ====================================================
-- 3. FONCTION : Création automatique de l'historique des mouvements
-- ====================================================

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

-- ====================================================
-- 4. TRIGGER : Historique des mouvements
-- ====================================================

CREATE TRIGGER trigger_historique_mouvement 
    AFTER INSERT ON employes_postes
    FOR EACH ROW 
    WHEN (NEW.est_actuel = TRUE)
    EXECUTE FUNCTION create_historique_mouvement();

-- ====================================================
-- 5. FONCTION : Mise à jour du statut des documents expirés
-- ====================================================

CREATE OR REPLACE FUNCTION update_document_status()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.date_expiration < CURRENT_DATE AND NEW.statut = 'valide' THEN
        NEW.statut = 'expire';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ====================================================
-- 6. TRIGGER : Expiration des documents
-- ====================================================

CREATE TRIGGER trigger_document_expiration 
    BEFORE UPDATE ON employes_documents
    FOR EACH ROW 
    EXECUTE FUNCTION update_document_status();

-- ====================================================
-- FIN DU FICHIER 3-FONCTION.sql
-- ====================================================

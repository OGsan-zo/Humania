# Module : Gestion du Personnel

## Description
Ce module contient les scripts SQL pour la gestion complète du personnel de l'entreprise.

## Structure des fichiers

### 0-REFERENCE.sql
Tables de référence pour la normalisation :
- `ref_situation_familiale` - Situations familiales (célibataire, marié, etc.)
- `ref_type_note` - Types de notes RH (observation, avertissement, etc.)
- `ref_banques` - Liste des banques de Madagascar

### 1-TABLE.sql
Création de toutes les tables du module :
- `postes` - Postes et fonctions de l'entreprise
- `cin` - Cartes d'identité nationale
- `comptes_bancaires` - Comptes bancaires des employés
- `employes_details` - Informations détaillées des employés (avec références)
- `employes_postes` - Affectation des employés aux postes
- `historique_mouvements` - Historique des promotions et mutations
- `types_documents` - Types de documents RH
- `employes_documents` - Documents attachés aux employés
- `contacts_urgence` - Contacts d'urgence des employés
- `notes_rh` - Notes et observations RH (avec référence type_note)

### 2-VUE.sql
Vues SQL pour faciliter les requêtes :
- `v_employes_complets` - Vue complète des employés avec leur poste actuel
- `v_documents_a_renouveler` - Documents expirés ou à renouveler

### 3-FONCTION.sql
Fonctions et triggers pour l'automatisation :
- `update_updated_at_column()` - Mise à jour automatique de updated_at
- `create_historique_mouvement()` - Création automatique de l'historique lors d'un changement de poste
- `update_document_status()` - Mise à jour du statut des documents expirés
- Triggers associés

### 4-DATA.sql
Données de référence initiales :
- Situations familiales (6 types)
- Types de notes RH (6 types)
- Banques de Madagascar (8 banques)
- Types de documents RH (10 types)

## Ordre d'exécution

Pour créer le module complet, exécuter les scripts dans l'ordre suivant :

```bash
psql -U postgres -f 0-REFERENCE.sql
psql -U postgres -f 1-TABLE.sql
psql -U postgres -f 2-VUE.sql
psql -U postgres -f 3-FONCTION.sql
psql -U postgres -f 4-DATA.sql
```

**IMPORTANT** : Le fichier `0-REFERENCE.sql` doit être exécuté en premier car les autres tables en dépendent.

## Dépendances

Ce module nécessite les tables existantes suivantes :
- `employes`
- `candidats`
- `departements`
- `users`
- `contrats`

## Fonctionnalités couvertes

- ✅ Fiche employé complète (identité, contact, poste, photo)
- ✅ Suivi du contrat de travail
- ✅ Historique des postes, promotions, mobilités
- ✅ Gestion des documents RH (CIN, diplômes, attestations)
- ✅ Contacts d'urgence
- ✅ Notes et observations RH
- ✅ Alertes automatiques pour documents expirés
- ✅ Normalisation avec tables de référence (performance optimisée)
- ✅ Gestion des comptes bancaires
- ✅ Gestion des CIN avec détails complets

## Avantages de la normalisation

- 🚀 **Performance** : Comparaisons INT plus rapides que VARCHAR
- 🎯 **Intégrité** : Données de référence centralisées
- 🔧 **Maintenance** : Modification facile des libellés
- ✅ **Cohérence** : Pas de fautes de frappe ou variations

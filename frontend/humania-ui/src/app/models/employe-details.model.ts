// Model pour les détails complets d'un employé
export interface EmployeDetails {
  // Informations de base
  id: number;
  matricule: string;
  nom: string;
  prenom: string;
  email: string;
  telephone?: string;
  telephoneMobile?: string;
  dateNaissance?: Date;
  dateEmbauche: Date;
  statut: string;
  photo?: string;

  // Informations personnelles
  adresse?: string;
  ville?: string;
  codePostal?: string;
  situationFamiliale?: string;
  nombreEnfants?: number;
  cin?: string;
  lieuNaissance?: string;
  nationalite?: string;

  // Poste actuel
  posteActuel?: string;
  departement?: string;
  dateDebutPoste?: Date;
  salaireActuel?: number;
  typeAffectation?: string;

  // Contrat
  typeContrat?: string;
  dateDebutContrat?: Date;
  dateFinContrat?: Date;
  nombreRenouvellements?: number;
  numeroCnaps?: string;
  numeroOstie?: string;

  // Informations bancaires
  banque?: string;
  numeroCompte?: string;
  rib?: string;
}

// Model pour un document
export interface Document {
  id: number;
  typeDocument: string;
  numeroDocument?: string;
  dateEmission?: Date;
  dateExpiration?: Date;
  statut: string;
  fichierPath?: string;
}

// Model pour l'historique des postes
export interface HistoriquePoste {
  id: number;
  poste: string;
  departement: string;
  dateDebut: Date;
  dateFin?: Date;
  typeMouvement: string;
  motif?: string;
}

// Model pour un contact d'urgence
export interface ContactUrgence {
  id: number;
  nom: string;
  prenom: string;
  relation: string;
  telephone: string;
  priorite: number;
}

// Model pour les détails complets d'un poste
export interface PosteDetails {
  id: number;
  code: string;
  intitule: string;
  description?: string;
  departement: string;
  departementId: number;
  niveauHierarchique: number;
  salaireMin?: number;
  salaireMax?: number;
  competencesRequises?: string;
  statut: string;
  nombreEmployes: number;
  dateCreation?: Date;
  responsableHierarchique?: string;
}

// Model pour un employé affecté au poste
export interface EmployeAffecte {
  id: number;
  matricule: string;
  nom: string;
  prenom: string;
  email: string;
  telephone?: string;
  dateDebut: Date;
  dateFin?: Date;
  salaire?: number;
  typeAffectation: string;
  estActuel: boolean;
}

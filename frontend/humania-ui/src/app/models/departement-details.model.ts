// Model pour les détails complets d'un département
export interface DepartementDetails {
  id: number;
  code: string;
  nom: string;
  description?: string;
  responsableId?: number;
  responsableNom?: string;
  responsablePrenom?: string;
  responsableMatricule?: string;
  responsablePhoto?: string;
  nombreEmployes: number;
  nombrePostes: number;
  budget?: number;
  statut: string;
  dateCreation?: Date;
  localisation?: string;
  telephone?: string;
  email?: string;
}

// Model pour un employé du département
export interface EmployeDepartement {
  id: number;
  matricule: string;
  nom: string;
  prenom: string;
  poste: string;
  email: string;
  telephone?: string;
  dateEntree: Date;
  photo?: string;
}

// Model pour un poste du département
export interface PosteDepartement {
  id: number;
  code: string;
  intitule: string;
  nombreEmployes: number;
  salaireMin?: number;
  salaireMax?: number;
  statut: string;
}

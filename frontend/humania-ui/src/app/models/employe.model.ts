// Model pour un employé
export interface Employe {
  id: number;
  matricule: string;
  nom: string;
  prenom: string;
  email: string;
  telephone?: string;
  dateNaissance?: Date;
  dateEmbauche: Date;
  posteActuel?: string;
  departement?: string;
  statut: string;
  photo?: string;
}

// Model pour les filtres
export interface EmployeFilters {
  search?: string;
  departementId?: number;
  posteId?: number;
  statut?: string;
}

// Model pour un département
export interface Departement {
  id: number;
  code: string;
  nom: string;
  description?: string;
  responsableId?: number;
  responsableNom?: string;
  responsablePrenom?: string;
  nombreEmployes: number;
  nombrePostes: number;
  budget?: number;
  statut: string;
  dateCreation?: Date;
}

// Model pour les filtres
export interface DepartementFilters {
  search?: string;
  statut?: string;
}

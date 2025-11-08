// Model pour un poste
export interface Poste {
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
  nombreEmployes?: number;
}

// Model pour les filtres
export interface PosteFilters {
  search?: string;
  departementId?: number;
  statut?: string;
  niveauHierarchique?: number;
}

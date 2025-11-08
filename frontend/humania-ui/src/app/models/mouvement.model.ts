// Model pour un mouvement
export interface Mouvement {
  id: number;
  employeId: number;
  employeNom: string;
  employePrenom: string;
  employeMatricule: string;
  employePhoto?: string;
  typeMouvement: string;
  
  // Ancien poste
  ancienPoste?: string;
  ancienDepartement?: string;
  ancienSalaire?: number;
  
  // Nouveau poste
  nouveauPoste?: string;
  nouveauDepartement?: string;
  nouveauSalaire?: number;
  
  dateMouvement: Date;
  motif?: string;
  validePar?: string;
}

// Model pour les filtres
export interface MouvementFilters {
  search?: string;
  typeMouvement?: string;
  departement?: string;
  annee?: number;
}

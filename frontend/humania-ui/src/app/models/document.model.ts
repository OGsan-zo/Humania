// Model pour un document
export interface Document {
  id: number;
  employeId: number;
  employeNom: string;
  employePrenom: string;
  employeMatricule: string;
  typeDocument: string;
  numeroDocument?: string;
  dateEmission?: Date;
  dateExpiration?: Date;
  statut: string;
  fichierPath?: string;
  remarques?: string;
  joursAvantExpiration?: number;
}

// Model pour les filtres
export interface DocumentFilters {
  search?: string;
  typeDocument?: string;
  statut?: string;
  urgenceOnly?: boolean;
}

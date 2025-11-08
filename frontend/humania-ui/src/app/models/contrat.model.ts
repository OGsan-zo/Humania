// Model pour un contrat
export interface Contrat {
  id: number;
  numeroContrat: string;
  employeId: number;
  employeNom: string;
  employePrenom: string;
  employeMatricule: string;
  typeContrat: string;
  dateDebut: Date;
  dateFin?: Date;
  duree?: number;
  statut: string;
  salaireBase: number;
  nombreRenouvellements: number;
  joursAvantExpiration?: number;
}

// Model pour les filtres
export interface ContratFilters {
  search?: string;
  typeContrat?: string;
  statut?: string;
  alerteRenouvellement?: boolean;
}

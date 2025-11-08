// Model pour les détails complets d'un contrat
export interface ContratDetails {
  id: number;
  numeroContrat: string;
  employeId: number;
  employeNom: string;
  employePrenom: string;
  employeMatricule: string;
  employePhoto?: string;
  typeContrat: string;
  dateDebut: Date;
  dateFin?: Date;
  duree?: number;
  statut: string;
  salaireBase: number;
  primes?: number;
  avantages?: string;
  nombreRenouvellements: number;
  joursAvantExpiration?: number;
  
  // Détails supplémentaires
  lieuSignature?: string;
  dateSignature?: Date;
  periodeEssai?: number;
  clauseParticuliere?: string;
  motifFin?: string;
  
  // Affiliations
  numeroCnaps?: string;
  numeroOstie?: string;
}

// Model pour un renouvellement
export interface Renouvellement {
  id: number;
  numeroAvenant: string;
  dateRenouvellement: Date;
  ancienneDateFin: Date;
  nouvelleDateFin: Date;
  nouvelleDuree: number;
  nouveauSalaire?: number;
  motif?: string;
  validePar?: string;
}

// Model pour une clause
export interface Clause {
  id: number;
  titre: string;
  description: string;
  type: string; // 'standard', 'particuliere', 'confidentialite', 'non-concurrence'
}

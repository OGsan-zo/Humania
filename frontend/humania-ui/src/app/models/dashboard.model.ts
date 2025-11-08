// Model pour les statistiques du dashboard
export interface DashboardStats {
  totalEmployes: number;
  totalContrats: number;
  contratsARenouveler: number;
  documentsExpires: number;
  totalDepartements: number;
  totalPostes: number;
}

// Model pour les alertes
export interface Alert {
  id: number;
  type: 'warning' | 'danger' | 'info';
  title: string;
  message: string;
  date: Date;
}

// Model pour les données du dashboard
export interface DashboardData {
  stats: DashboardStats;
  alerts: Alert[];
}

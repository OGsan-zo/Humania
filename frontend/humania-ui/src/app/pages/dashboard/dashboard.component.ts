import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { DashboardService } from '../../services/dashboard.service';
import { AuthService } from '../../services/auth.service';
import { DashboardData, DashboardStats, Alert } from '../../models/dashboard.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentUser: User | null = null;
  stats: DashboardStats | null = null;
  alerts: Alert[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private dashboardService: DashboardService,
    private authService: AuthService,
    private router: Router
  ) {
    // MODE TEST : Utilisateur fictif
    this.currentUser = {
      id: 1,
      name: 'Admin Test',
      email: 'admin@humania.mg',
      role: 'admin'
    };
    // Code original : this.currentUser = this.authService.currentUserValue;
  }

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.isLoading = true;
    
    // MODE TEST : Utiliser des données fictives
    // TODO: Remplacer par l'appel API réel
    setTimeout(() => {
      this.stats = {
        totalEmployes: 45,
        totalContrats: 42,
        contratsARenouveler: 5,
        documentsExpires: 8,
        totalDepartements: 6,
        totalPostes: 12
      };
      
      this.alerts = [
        {
          id: 1,
          type: 'danger',
          title: 'Documents expirés',
          message: '8 documents ont expiré et nécessitent un renouvellement urgent',
          date: new Date()
        },
        {
          id: 2,
          type: 'warning',
          title: 'Contrats à renouveler',
          message: '5 contrats arrivent à échéance dans les 30 prochains jours',
          date: new Date()
        },
        {
          id: 3,
          type: 'info',
          title: 'Nouveaux employés',
          message: '3 nouveaux employés ont été ajoutés ce mois-ci',
          date: new Date()
        }
      ];
      
      this.isLoading = false;
    }, 500);

    // Code original (commenté pour le test)
    /*
    this.dashboardService.getDashboardData().subscribe({
      next: (data: DashboardData) => {
        this.stats = data.stats;
        this.alerts = data.alerts;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors du chargement des données';
        this.isLoading = false;
        console.error('Erreur dashboard:', error);
      }
    });
    */
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  getAlertIcon(type: string): string {
    switch (type) {
      case 'danger': return '🔴';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      default: return '📌';
    }
  }

  getAlertClass(type: string): string {
    switch (type) {
      case 'danger': return 'bg-red-50 border-red-200 text-red-800';
      case 'warning': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'info': return 'bg-blue-50 border-blue-200 text-blue-800';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ContratService } from '../../../services/contrat.service';
import { Contrat } from '../../../models/contrat.model';

@Component({
  selector: 'app-contrat-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './contrat-list.component.html',
  styleUrls: ['./contrat-list.component.css']
})
export class ContratListComponent implements OnInit {
  contrats: Contrat[] = [];
  filteredContrats: Contrat[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';
  
  // Filtres
  searchTerm: string = '';
  selectedType: string = '';
  selectedStatut: string = '';
  showAlerteOnly: boolean = false;

  constructor(
    private contratService: ContratService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadContrats();
  }

  loadContrats(): void {
    this.isLoading = true;
    
    // MODE TEST : Données fictives
    setTimeout(() => {
      const today = new Date();
      
      this.contrats = [
        {
          id: 1,
          numeroContrat: 'CTR-2020-001',
          employeId: 1,
          employeNom: 'Rakoto',
          employePrenom: 'Jean',
          employeMatricule: 'EMP001',
          typeContrat: 'CDI',
          dateDebut: new Date('2020-01-10'),
          dateFin: undefined,
          duree: undefined,
          statut: 'actif',
          salaireBase: 2500000,
          nombreRenouvellements: 0,
          joursAvantExpiration: undefined
        },
        {
          id: 2,
          numeroContrat: 'CTR-2023-015',
          employeId: 2,
          employeNom: 'Razafy',
          employePrenom: 'Marie',
          employeMatricule: 'EMP002',
          typeContrat: 'CDD',
          dateDebut: new Date('2023-03-15'),
          dateFin: new Date('2025-03-14'),
          duree: 24,
          statut: 'actif',
          salaireBase: 3000000,
          nombreRenouvellements: 1,
          joursAvantExpiration: 126
        },
        {
          id: 3,
          numeroContrat: 'CTR-2024-008',
          employeId: 3,
          employeNom: 'Andria',
          employePrenom: 'Paul',
          employeMatricule: 'EMP003',
          typeContrat: 'CDD',
          dateDebut: new Date('2024-06-01'),
          dateFin: new Date('2024-12-31'),
          duree: 7,
          statut: 'actif',
          salaireBase: 1800000,
          nombreRenouvellements: 0,
          joursAvantExpiration: 23
        },
        {
          id: 4,
          numeroContrat: 'CTR-2024-012',
          employeId: 4,
          employeNom: 'Rabe',
          employePrenom: 'Sophie',
          employeMatricule: 'EMP004',
          typeContrat: 'Essai',
          dateDebut: new Date('2024-09-12'),
          dateFin: new Date('2024-12-11'),
          duree: 3,
          statut: 'actif',
          salaireBase: 1500000,
          nombreRenouvellements: 0,
          joursAvantExpiration: 3
        },
        {
          id: 5,
          numeroContrat: 'CTR-2018-003',
          employeId: 5,
          employeNom: 'Randria',
          employePrenom: 'Michel',
          employeMatricule: 'EMP005',
          typeContrat: 'CDI',
          dateDebut: new Date('2018-11-20'),
          dateFin: undefined,
          duree: undefined,
          statut: 'actif',
          salaireBase: 2500000,
          nombreRenouvellements: 0,
          joursAvantExpiration: undefined
        },
        {
          id: 6,
          numeroContrat: 'CTR-2022-007',
          employeId: 6,
          employeNom: 'Rasoanaivo',
          employePrenom: 'Luc',
          employeMatricule: 'EMP006',
          typeContrat: 'CDD',
          dateDebut: new Date('2022-05-10'),
          dateFin: new Date('2023-05-09'),
          duree: 12,
          statut: 'expire',
          salaireBase: 2000000,
          nombreRenouvellements: 2,
          joursAvantExpiration: -580
        }
      ];
      
      this.filteredContrats = [...this.contrats];
      this.isLoading = false;
    }, 500);
  }

  applyFilters(): void {
    this.filteredContrats = this.contrats.filter(contrat => {
      const matchSearch = !this.searchTerm || 
        contrat.employeNom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        contrat.employePrenom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        contrat.employeMatricule.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        contrat.numeroContrat.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchType = !this.selectedType || 
        contrat.typeContrat === this.selectedType;
      
      const matchStatut = !this.selectedStatut || 
        contrat.statut === this.selectedStatut;
      
      const matchAlerte = !this.showAlerteOnly || 
        (contrat.joursAvantExpiration !== undefined && contrat.joursAvantExpiration <= 30 && contrat.joursAvantExpiration > 0);
      
      return matchSearch && matchType && matchStatut && matchAlerte;
    });
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.selectedType = '';
    this.selectedStatut = '';
    this.showAlerteOnly = false;
    this.filteredContrats = [...this.contrats];
  }

  viewDetails(id: number): void {
    this.router.navigate(['/contrats', id]);
  }

  getStatutClass(statut: string): string {
    switch (statut.toLowerCase()) {
      case 'actif':
        return 'bg-green-100 text-green-800';
      case 'expire':
        return 'bg-red-100 text-red-800';
      case 'suspendu':
        return 'bg-yellow-100 text-yellow-800';
      case 'resilie':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  getAlerteClass(jours: number | undefined): string {
    if (jours === undefined || jours < 0) return '';
    if (jours <= 7) return 'bg-red-50 border-red-200';
    if (jours <= 30) return 'bg-orange-50 border-orange-200';
    return '';
  }

  getAlerteIcon(jours: number | undefined): string {
    if (jours === undefined || jours < 0) return '';
    if (jours <= 7) return '🔴';
    if (jours <= 30) return '⚠️';
    return '';
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('fr-MG', {
      style: 'currency',
      currency: 'MGA',
      minimumFractionDigits: 0
    }).format(amount);
  }

  countContratsARenouveler(): number {
    return this.contrats.filter(c => 
      c.joursAvantExpiration !== undefined && 
      c.joursAvantExpiration <= 30 && 
      c.joursAvantExpiration > 0
    ).length;
  }
}

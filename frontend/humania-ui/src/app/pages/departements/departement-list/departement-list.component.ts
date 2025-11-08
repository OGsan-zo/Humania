import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { DepartementService } from '../../../services/departement.service';
import { Departement } from '../../../models/departement.model';

@Component({
  selector: 'app-departement-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './departement-list.component.html',
  styleUrls: ['./departement-list.component.css']
})
export class DepartementListComponent implements OnInit {
  departements: Departement[] = [];
  filteredDepartements: Departement[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';
  
  // Filtres
  searchTerm: string = '';
  selectedStatut: string = '';

  constructor(
    private departementService: DepartementService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDepartements();
  }

  loadDepartements(): void {
    this.isLoading = true;
    
    // MODE TEST : Données fictives
    setTimeout(() => {
      this.departements = [
        {
          id: 1,
          code: 'DEPT-IT',
          nom: 'Informatique',
          description: 'Développement logiciel, infrastructure et support technique',
          responsableId: 7,
          responsableNom: 'Rakotondrabe',
          responsablePrenom: 'Luc',
          nombreEmployes: 8,
          nombrePostes: 5,
          budget: 150000000,
          statut: 'actif',
          dateCreation: new Date('2015-01-15')
        },
        {
          id: 2,
          code: 'DEPT-GP',
          nom: 'Gestion de Projet',
          description: 'Pilotage et coordination des projets de l\'entreprise',
          responsableId: 2,
          responsableNom: 'Razafy',
          responsablePrenom: 'Marie',
          nombreEmployes: 4,
          nombrePostes: 3,
          budget: 80000000,
          statut: 'actif',
          dateCreation: new Date('2016-03-20')
        },
        {
          id: 3,
          code: 'DEPT-FIN',
          nom: 'Finance',
          description: 'Comptabilité, contrôle de gestion et trésorerie',
          responsableId: 8,
          responsableNom: 'Andrianina',
          responsablePrenom: 'Hery',
          nombreEmployes: 5,
          nombrePostes: 4,
          budget: 100000000,
          statut: 'actif',
          dateCreation: new Date('2015-01-15')
        },
        {
          id: 4,
          code: 'DEPT-DES',
          nom: 'Design',
          description: 'Conception UI/UX et identité visuelle',
          responsableId: 4,
          responsableNom: 'Rabe',
          responsablePrenom: 'Sophie',
          nombreEmployes: 3,
          nombrePostes: 2,
          budget: 50000000,
          statut: 'actif',
          dateCreation: new Date('2018-06-10')
        },
        {
          id: 5,
          code: 'DEPT-RH',
          nom: 'Ressources Humaines',
          description: 'Recrutement, formation et gestion du personnel',
          responsableId: 5,
          responsableNom: 'Randria',
          responsablePrenom: 'Michel',
          nombreEmployes: 3,
          nombrePostes: 3,
          budget: 60000000,
          statut: 'actif',
          dateCreation: new Date('2015-01-15')
        },
        {
          id: 6,
          code: 'DEPT-COM',
          nom: 'Commercial',
          description: 'Ventes et relations clients',
          responsableId: undefined,
          responsableNom: undefined,
          responsablePrenom: undefined,
          nombreEmployes: 0,
          nombrePostes: 2,
          budget: 70000000,
          statut: 'en_creation',
          dateCreation: new Date('2024-11-01')
        }
      ];
      
      this.filteredDepartements = [...this.departements];
      this.isLoading = false;
    }, 500);
  }

  applyFilters(): void {
    this.filteredDepartements = this.departements.filter(dept => {
      const matchSearch = !this.searchTerm || 
        dept.nom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        dept.code.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        (dept.description && dept.description.toLowerCase().includes(this.searchTerm.toLowerCase()));
      
      const matchStatut = !this.selectedStatut || 
        dept.statut === this.selectedStatut;
      
      return matchSearch && matchStatut;
    });
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.selectedStatut = '';
    this.filteredDepartements = [...this.departements];
  }

  viewDetails(id: number): void {
    this.router.navigate(['/departements', id]);
  }

  getStatutClass(statut: string): string {
    switch (statut.toLowerCase()) {
      case 'actif':
        return 'bg-green-100 text-green-800';
      case 'en_creation':
        return 'bg-yellow-100 text-yellow-800';
      case 'inactif':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  formatCurrency(amount: number | undefined): string {
    if (!amount) return '-';
    return new Intl.NumberFormat('fr-MG', {
      style: 'currency',
      currency: 'MGA',
      minimumFractionDigits: 0
    }).format(amount);
  }

  getTotalEmployes(): number {
    return this.departements.reduce((sum, dept) => sum + dept.nombreEmployes, 0);
  }

  getTotalBudget(): number {
    return this.departements.reduce((sum, dept) => sum + (dept.budget || 0), 0);
  }
}

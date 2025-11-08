import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { PosteService } from '../../../services/poste.service';
import { Poste } from '../../../models/poste.model';

@Component({
  selector: 'app-poste-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './poste-list.component.html',
  styleUrls: ['./poste-list.component.css']
})
export class PosteListComponent implements OnInit {
  postes: Poste[] = [];
  filteredPostes: Poste[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';
  
  // Filtres
  searchTerm: string = '';
  selectedDepartement: string = '';
  selectedStatut: string = '';
  selectedNiveau: string = '';

  constructor(
    private posteService: PosteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPostes();
  }

  loadPostes(): void {
    this.isLoading = true;
    
    // MODE TEST : Données fictives
    setTimeout(() => {
      this.postes = [
        {
          id: 1,
          code: 'POST001',
          intitule: 'Développeur Senior',
          description: 'Développement d\'applications web et mobile',
          departement: 'Informatique',
          departementId: 1,
          niveauHierarchique: 2,
          salaireMin: 2000000,
          salaireMax: 3500000,
          competencesRequises: 'Angular, Java, Spring Boot, PostgreSQL',
          statut: 'actif',
          nombreEmployes: 3
        },
        {
          id: 2,
          code: 'POST002',
          intitule: 'Chef de Projet',
          description: 'Gestion de projets informatiques',
          departement: 'Gestion de Projet',
          departementId: 2,
          niveauHierarchique: 3,
          salaireMin: 3000000,
          salaireMax: 4500000,
          competencesRequises: 'Gestion de projet, Scrum, Agile',
          statut: 'actif',
          nombreEmployes: 2
        },
        {
          id: 3,
          code: 'POST003',
          intitule: 'Comptable',
          description: 'Gestion de la comptabilité générale',
          departement: 'Finance',
          departementId: 3,
          niveauHierarchique: 2,
          salaireMin: 1800000,
          salaireMax: 2800000,
          competencesRequises: 'Comptabilité, Fiscalité, Excel',
          statut: 'actif',
          nombreEmployes: 2
        },
        {
          id: 4,
          code: 'POST004',
          intitule: 'Designer UI/UX',
          description: 'Conception d\'interfaces utilisateur',
          departement: 'Design',
          departementId: 4,
          niveauHierarchique: 2,
          salaireMin: 1500000,
          salaireMax: 2500000,
          competencesRequises: 'Figma, Adobe XD, Photoshop',
          statut: 'actif',
          nombreEmployes: 1
        },
        {
          id: 5,
          code: 'POST005',
          intitule: 'Responsable RH',
          description: 'Gestion des ressources humaines',
          departement: 'Ressources Humaines',
          departementId: 5,
          niveauHierarchique: 3,
          salaireMin: 2500000,
          salaireMax: 3500000,
          competencesRequises: 'Gestion RH, Recrutement, Droit du travail',
          statut: 'actif',
          nombreEmployes: 1
        },
        {
          id: 6,
          code: 'POST006',
          intitule: 'Développeur Junior',
          description: 'Développement web sous supervision',
          departement: 'Informatique',
          departementId: 1,
          niveauHierarchique: 1,
          salaireMin: 1200000,
          salaireMax: 1800000,
          competencesRequises: 'HTML, CSS, JavaScript, bases en framework',
          statut: 'vacant',
          nombreEmployes: 0
        },
        {
          id: 7,
          code: 'POST007',
          intitule: 'Directeur Technique',
          description: 'Direction de l\'équipe technique',
          departement: 'Informatique',
          departementId: 1,
          niveauHierarchique: 4,
          salaireMin: 4000000,
          salaireMax: 6000000,
          competencesRequises: 'Leadership, Architecture logicielle, Management',
          statut: 'actif',
          nombreEmployes: 1
        }
      ];
      
      this.filteredPostes = [...this.postes];
      this.isLoading = false;
    }, 500);
  }

  applyFilters(): void {
    this.filteredPostes = this.postes.filter(poste => {
      const matchSearch = !this.searchTerm || 
        poste.intitule.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        poste.code.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        (poste.description && poste.description.toLowerCase().includes(this.searchTerm.toLowerCase()));
      
      const matchDepartement = !this.selectedDepartement || 
        poste.departement === this.selectedDepartement;
      
      const matchStatut = !this.selectedStatut || 
        poste.statut === this.selectedStatut;
      
      const matchNiveau = !this.selectedNiveau || 
        poste.niveauHierarchique.toString() === this.selectedNiveau;
      
      return matchSearch && matchDepartement && matchStatut && matchNiveau;
    });
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.selectedDepartement = '';
    this.selectedStatut = '';
    this.selectedNiveau = '';
    this.filteredPostes = [...this.postes];
  }

  viewDetails(id: number): void {
    this.router.navigate(['/postes', id]);
  }

  getStatutClass(statut: string): string {
    switch (statut.toLowerCase()) {
      case 'actif':
        return 'bg-green-100 text-green-800';
      case 'vacant':
        return 'bg-yellow-100 text-yellow-800';
      case 'suspendu':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  getNiveauLabel(niveau: number): string {
    switch (niveau) {
      case 1: return 'Opérationnel';
      case 2: return 'Superviseur';
      case 3: return 'Manager';
      case 4: return 'Directeur';
      default: return 'Non défini';
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
}

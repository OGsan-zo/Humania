import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MouvementService } from '../../../services/mouvement.service';
import { Mouvement } from '../../../models/mouvement.model';

@Component({
  selector: 'app-mouvement-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './mouvement-list.component.html',
  styleUrls: ['./mouvement-list.component.css']
})
export class MouvementListComponent implements OnInit {
  mouvements: Mouvement[] = [];
  filteredMouvements: Mouvement[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';
  
  // Filtres
  searchTerm: string = '';
  selectedType: string = '';
  selectedDepartement: string = '';
  selectedAnnee: string = '';

  constructor(
    private mouvementService: MouvementService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadMouvements();
  }

  loadMouvements(): void {
    this.isLoading = true;
    
    // MODE TEST : Données fictives
    setTimeout(() => {
      this.mouvements = [
        {
          id: 1,
          employeId: 1,
          employeNom: 'Rakoto',
          employePrenom: 'Jean',
          employeMatricule: 'EMP001',
          employePhoto: 'https://ui-avatars.com/api/?name=Jean+Rakoto&size=200',
          typeMouvement: 'Promotion',
          ancienPoste: 'Développeur Junior',
          ancienDepartement: 'Informatique',
          ancienSalaire: 1800000,
          nouveauPoste: 'Développeur Senior',
          nouveauDepartement: 'Informatique',
          nouveauSalaire: 2500000,
          dateMouvement: new Date('2022-06-01'),
          motif: 'Excellentes performances et maîtrise technique',
          validePar: 'Directeur Technique'
        },
        {
          id: 2,
          employeId: 2,
          employeNom: 'Razafy',
          employePrenom: 'Marie',
          employeMatricule: 'EMP002',
          employePhoto: 'https://ui-avatars.com/api/?name=Marie+Razafy&size=200',
          typeMouvement: 'Mutation',
          ancienPoste: 'Analyste',
          ancienDepartement: 'Finance',
          ancienSalaire: 2500000,
          nouveauPoste: 'Chef de Projet',
          nouveauDepartement: 'Gestion de Projet',
          nouveauSalaire: 3000000,
          dateMouvement: new Date('2023-09-15'),
          motif: 'Réorganisation interne et compétences en gestion',
          validePar: 'Directeur Général'
        },
        {
          id: 3,
          employeId: 3,
          employeNom: 'Andria',
          employePrenom: 'Paul',
          employeMatricule: 'EMP003',
          employePhoto: 'https://ui-avatars.com/api/?name=Paul+Andria&size=200',
          typeMouvement: 'Embauche',
          ancienPoste: undefined,
          ancienDepartement: undefined,
          ancienSalaire: undefined,
          nouveauPoste: 'Comptable',
          nouveauDepartement: 'Finance',
          nouveauSalaire: 1800000,
          dateMouvement: new Date('2021-06-01'),
          motif: 'Recrutement externe',
          validePar: 'Directeur RH'
        },
        {
          id: 4,
          employeId: 4,
          employeNom: 'Rabe',
          employePrenom: 'Sophie',
          employeMatricule: 'EMP004',
          employePhoto: 'https://ui-avatars.com/api/?name=Sophie+Rabe&size=200',
          typeMouvement: 'Embauche',
          ancienPoste: undefined,
          ancienDepartement: undefined,
          ancienSalaire: undefined,
          nouveauPoste: 'Designer UI/UX',
          nouveauDepartement: 'Design',
          nouveauSalaire: 1500000,
          dateMouvement: new Date('2022-09-12'),
          motif: 'Recrutement externe',
          validePar: 'Directeur RH'
        },
        {
          id: 5,
          employeId: 5,
          employeNom: 'Randria',
          employePrenom: 'Michel',
          employeMatricule: 'EMP005',
          employePhoto: 'https://ui-avatars.com/api/?name=Michel+Randria&size=200',
          typeMouvement: 'Promotion',
          ancienPoste: 'Assistant RH',
          ancienDepartement: 'Ressources Humaines',
          ancienSalaire: 1800000,
          nouveauPoste: 'Responsable RH',
          nouveauDepartement: 'Ressources Humaines',
          nouveauSalaire: 2500000,
          dateMouvement: new Date('2020-03-01'),
          motif: 'Promotion interne suite à formation',
          validePar: 'Directeur Général'
        },
        {
          id: 6,
          employeId: 1,
          employeNom: 'Rakoto',
          employePrenom: 'Jean',
          employeMatricule: 'EMP001',
          employePhoto: 'https://ui-avatars.com/api/?name=Jean+Rakoto&size=200',
          typeMouvement: 'Embauche',
          ancienPoste: undefined,
          ancienDepartement: undefined,
          ancienSalaire: undefined,
          nouveauPoste: 'Développeur Junior',
          nouveauDepartement: 'Informatique',
          nouveauSalaire: 1200000,
          dateMouvement: new Date('2020-01-10'),
          motif: 'Recrutement externe',
          validePar: 'Directeur Technique'
        }
      ];
      
      // Trier par date décroissante
      this.mouvements.sort((a, b) => b.dateMouvement.getTime() - a.dateMouvement.getTime());
      this.filteredMouvements = [...this.mouvements];
      this.isLoading = false;
    }, 500);
  }

  applyFilters(): void {
    this.filteredMouvements = this.mouvements.filter(mouv => {
      const matchSearch = !this.searchTerm || 
        mouv.employeNom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        mouv.employePrenom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        mouv.employeMatricule.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        (mouv.nouveauPoste && mouv.nouveauPoste.toLowerCase().includes(this.searchTerm.toLowerCase()));
      
      const matchType = !this.selectedType || 
        mouv.typeMouvement === this.selectedType;
      
      const matchDepartement = !this.selectedDepartement || 
        mouv.nouveauDepartement === this.selectedDepartement ||
        mouv.ancienDepartement === this.selectedDepartement;
      
      const matchAnnee = !this.selectedAnnee || 
        new Date(mouv.dateMouvement).getFullYear().toString() === this.selectedAnnee;
      
      return matchSearch && matchType && matchDepartement && matchAnnee;
    });
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.selectedType = '';
    this.selectedDepartement = '';
    this.selectedAnnee = '';
    this.filteredMouvements = [...this.mouvements];
  }

  viewEmployeDetails(employeId: number): void {
    this.router.navigate(['/employes', employeId]);
  }

  getTypeIcon(type: string): string {
    switch (type) {
      case 'Promotion': return '⬆️';
      case 'Mutation': return '🔄';
      case 'Embauche': return '✅';
      case 'Départ': return '👋';
      case 'Mobilité': return '🚀';
      default: return '📌';
    }
  }

  getTypeClass(type: string): string {
    switch (type) {
      case 'Promotion': return 'bg-green-100 text-green-800 border-green-200';
      case 'Mutation': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Embauche': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'Départ': return 'bg-red-100 text-red-800 border-red-200';
      case 'Mobilité': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
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

  getUniqueYears(): number[] {
    const years = this.mouvements.map(m => new Date(m.dateMouvement).getFullYear());
    return [...new Set(years)].sort((a, b) => b - a);
  }

  countByType(type: string): number {
    return this.mouvements.filter(m => m.typeMouvement === type).length;
  }
}

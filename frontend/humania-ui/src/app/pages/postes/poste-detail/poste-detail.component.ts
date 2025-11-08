import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PosteService } from '../../../services/poste.service';
import { PosteDetails, EmployeAffecte } from '../../../models/poste-details.model';

@Component({
  selector: 'app-poste-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './poste-detail.component.html',
  styleUrls: ['./poste-detail.component.css']
})
export class PosteDetailComponent implements OnInit {
  poste: PosteDetails | null = null;
  employesActuels: EmployeAffecte[] = [];
  employesAnciens: EmployeAffecte[] = [];
  
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private posteService: PosteService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.loadPosteDetails(id);
  }

  loadPosteDetails(id: number): void {
    this.isLoading = true;

    // MODE TEST : Données fictives
    setTimeout(() => {
      this.poste = {
        id: id,
        code: 'POST001',
        intitule: 'Développeur Senior',
        description: 'Développement d\'applications web et mobile avec les technologies modernes. Participation à l\'architecture logicielle et mentorat des développeurs juniors.',
        departement: 'Informatique',
        departementId: 1,
        niveauHierarchique: 2,
        salaireMin: 2000000,
        salaireMax: 3500000,
        competencesRequises: 'Angular, Java, Spring Boot, PostgreSQL, Git, Docker, Kubernetes',
        statut: 'actif',
        nombreEmployes: 3,
        dateCreation: new Date('2019-01-15'),
        responsableHierarchique: 'Directeur Technique'
      };

      this.employesActuels = [
        {
          id: 1,
          matricule: 'EMP001',
          nom: 'Rakoto',
          prenom: 'Jean',
          email: 'jean.rakoto@humania.mg',
          telephone: '034 12 345 67',
          dateDebut: new Date('2022-06-01'),
          dateFin: undefined,
          salaire: 2500000,
          typeAffectation: 'Permanent',
          estActuel: true
        },
        {
          id: 8,
          matricule: 'EMP008',
          nom: 'Razafy',
          prenom: 'Luc',
          email: 'luc.razafy@humania.mg',
          telephone: '033 44 555 66',
          dateDebut: new Date('2023-03-15'),
          dateFin: undefined,
          salaire: 2800000,
          typeAffectation: 'Permanent',
          estActuel: true
        },
        {
          id: 12,
          matricule: 'EMP012',
          nom: 'Andria',
          prenom: 'Sophie',
          email: 'sophie.andria@humania.mg',
          telephone: '032 77 888 99',
          dateDebut: new Date('2023-09-01'),
          dateFin: undefined,
          salaire: 2200000,
          typeAffectation: 'Permanent',
          estActuel: true
        }
      ];

      this.employesAnciens = [
        {
          id: 15,
          matricule: 'EMP015',
          nom: 'Rabe',
          prenom: 'Michel',
          email: 'michel.rabe@humania.mg',
          telephone: '034 11 222 33',
          dateDebut: new Date('2020-01-10'),
          dateFin: new Date('2023-05-31'),
          salaire: 2300000,
          typeAffectation: 'Permanent',
          estActuel: false
        }
      ];

      this.isLoading = false;
    }, 500);
  }

  goBack(): void {
    this.router.navigate(['/postes']);
  }

  viewEmployeDetails(id: number): void {
    this.router.navigate(['/employes', id]);
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

  getNiveauIcon(niveau: number): string {
    switch (niveau) {
      case 1: return '🔵';
      case 2: return '🟢';
      case 3: return '🟡';
      case 4: return '🔴';
      default: return '⚪';
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

  calculateDuration(dateDebut: Date, dateFin?: Date): string {
    const start = new Date(dateDebut);
    const end = dateFin ? new Date(dateFin) : new Date();
    
    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    if (years > 0 && remainingMonths > 0) {
      return `${years} an${years > 1 ? 's' : ''} ${remainingMonths} mois`;
    } else if (years > 0) {
      return `${years} an${years > 1 ? 's' : ''}`;
    } else {
      return `${remainingMonths} mois`;
    }
  }
}

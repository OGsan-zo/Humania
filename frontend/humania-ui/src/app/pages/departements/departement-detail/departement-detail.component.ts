import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DepartementService } from '../../../services/departement.service';
import { DepartementDetails, EmployeDepartement, PosteDepartement } from '../../../models/departement-details.model';

@Component({
  selector: 'app-departement-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './departement-detail.component.html',
  styleUrls: ['./departement-detail.component.css']
})
export class DepartementDetailComponent implements OnInit {
  departement: DepartementDetails | null = null;
  employes: EmployeDepartement[] = [];
  postes: PosteDepartement[] = [];
  
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private departementService: DepartementService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.loadDepartementDetails(id);
  }

  loadDepartementDetails(id: number): void {
    this.isLoading = true;

    // MODE TEST : Données fictives
    setTimeout(() => {
      this.departement = {
        id: id,
        code: 'DEPT-IT',
        nom: 'Informatique',
        description: 'Le département Informatique est responsable du développement logiciel, de la maintenance de l\'infrastructure technique et du support aux utilisateurs. Il assure la transformation digitale de l\'entreprise.',
        responsableId: 7,
        responsableNom: 'Rakotondrabe',
        responsablePrenom: 'Luc',
        responsableMatricule: 'EMP007',
        responsablePhoto: 'https://ui-avatars.com/api/?name=Luc+Rakotondrabe&size=200',
        nombreEmployes: 8,
        nombrePostes: 5,
        budget: 150000000,
        statut: 'actif',
        dateCreation: new Date('2015-01-15'),
        localisation: 'Bâtiment A - 2ème étage',
        telephone: '020 12 345 00',
        email: 'informatique@humania.mg'
      };

      this.employes = [
        {
          id: 1,
          matricule: 'EMP001',
          nom: 'Rakoto',
          prenom: 'Jean',
          poste: 'Développeur Senior',
          email: 'jean.rakoto@humania.mg',
          telephone: '034 12 345 67',
          dateEntree: new Date('2020-01-10'),
          photo: 'https://ui-avatars.com/api/?name=Jean+Rakoto&size=200'
        },
        {
          id: 8,
          matricule: 'EMP008',
          nom: 'Razafy',
          prenom: 'Luc',
          poste: 'Développeur Senior',
          email: 'luc.razafy@humania.mg',
          telephone: '033 44 555 66',
          dateEntree: new Date('2019-03-15'),
          photo: 'https://ui-avatars.com/api/?name=Luc+Razafy&size=200'
        },
        {
          id: 12,
          matricule: 'EMP012',
          nom: 'Andria',
          prenom: 'Sophie',
          poste: 'Développeur Senior',
          email: 'sophie.andria@humania.mg',
          telephone: '032 77 888 99',
          dateEntree: new Date('2021-09-01'),
          photo: 'https://ui-avatars.com/api/?name=Sophie+Andria&size=200'
        },
        {
          id: 15,
          matricule: 'EMP015',
          nom: 'Rabe',
          prenom: 'Michel',
          poste: 'Développeur Junior',
          email: 'michel.rabe@humania.mg',
          telephone: '034 11 222 33',
          dateEntree: new Date('2023-06-01'),
          photo: 'https://ui-avatars.com/api/?name=Michel+Rabe&size=200'
        },
        {
          id: 7,
          matricule: 'EMP007',
          nom: 'Rakotondrabe',
          prenom: 'Luc',
          poste: 'Directeur Technique',
          email: 'luc.rakotondrabe@humania.mg',
          telephone: '033 99 888 77',
          dateEntree: new Date('2015-01-15'),
          photo: 'https://ui-avatars.com/api/?name=Luc+Rakotondrabe&size=200'
        }
      ];

      this.postes = [
        {
          id: 1,
          code: 'POST001',
          intitule: 'Développeur Senior',
          nombreEmployes: 3,
          salaireMin: 2000000,
          salaireMax: 3500000,
          statut: 'actif'
        },
        {
          id: 6,
          code: 'POST006',
          intitule: 'Développeur Junior',
          nombreEmployes: 1,
          salaireMin: 1200000,
          salaireMax: 1800000,
          statut: 'actif'
        },
        {
          id: 7,
          code: 'POST007',
          intitule: 'Directeur Technique',
          nombreEmployes: 1,
          salaireMin: 4000000,
          salaireMax: 6000000,
          statut: 'actif'
        },
        {
          id: 10,
          code: 'POST010',
          intitule: 'Administrateur Système',
          nombreEmployes: 0,
          salaireMin: 2200000,
          salaireMax: 3200000,
          statut: 'vacant'
        },
        {
          id: 11,
          code: 'POST011',
          intitule: 'Analyste Données',
          nombreEmployes: 0,
          salaireMin: 2500000,
          salaireMax: 3800000,
          statut: 'vacant'
        }
      ];

      this.isLoading = false;
    }, 500);
  }

  goBack(): void {
    this.router.navigate(['/departements']);
  }

  viewEmployeDetails(id: number): void {
    this.router.navigate(['/employes', id]);
  }

  viewPosteDetails(id: number): void {
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

  formatCurrency(amount: number | undefined): string {
    if (!amount) return '-';
    return new Intl.NumberFormat('fr-MG', {
      style: 'currency',
      currency: 'MGA',
      minimumFractionDigits: 0
    }).format(amount);
  }

  calculateDuration(dateEntree: Date): string {
    const start = new Date(dateEntree);
    const end = new Date();
    
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

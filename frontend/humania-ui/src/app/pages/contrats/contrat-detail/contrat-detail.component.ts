import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ContratService } from '../../../services/contrat.service';
import { ContratDetails, Renouvellement, Clause } from '../../../models/contrat-details.model';

@Component({
  selector: 'app-contrat-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './contrat-detail.component.html',
  styleUrls: ['./contrat-detail.component.css']
})
export class ContratDetailComponent implements OnInit {
  contrat: ContratDetails | null = null;
  renouvellements: Renouvellement[] = [];
  clauses: Clause[] = [];
  
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contratService: ContratService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.loadContratDetails(id);
  }

  loadContratDetails(id: number): void {
    this.isLoading = true;

    // MODE TEST : Données fictives
    setTimeout(() => {
      this.contrat = {
        id: id,
        numeroContrat: 'CTR-2024-008',
        employeId: 3,
        employeNom: 'Andria',
        employePrenom: 'Paul',
        employeMatricule: 'EMP003',
        employePhoto: 'https://ui-avatars.com/api/?name=Paul+Andria&size=200',
        typeContrat: 'CDD',
        dateDebut: new Date('2024-06-01'),
        dateFin: new Date('2024-12-31'),
        duree: 7,
        statut: 'actif',
        salaireBase: 1800000,
        primes: 200000,
        avantages: 'Tickets restaurant, Assurance santé',
        nombreRenouvellements: 0,
        joursAvantExpiration: 23,
        
        lieuSignature: 'Antananarivo',
        dateSignature: new Date('2024-05-25'),
        periodeEssai: 1,
        clauseParticuliere: 'Possibilité de télétravail 2 jours par semaine',
        motifFin: undefined,
        
        numeroCnaps: 'CNAPS-789012',
        numeroOstie: 'OSTIE-345678'
      };

      this.renouvellements = [
        // Pas de renouvellement pour ce contrat
      ];

      this.clauses = [
        {
          id: 1,
          titre: 'Durée du contrat',
          description: 'Le présent contrat est conclu pour une durée déterminée de 7 mois, du 01/06/2024 au 31/12/2024.',
          type: 'standard'
        },
        {
          id: 2,
          titre: 'Période d\'essai',
          description: 'Une période d\'essai d\'un (1) mois est prévue. Durant cette période, chaque partie peut rompre le contrat sans préavis ni indemnité.',
          type: 'standard'
        },
        {
          id: 3,
          titre: 'Rémunération',
          description: 'Le salaire mensuel brut de base est fixé à 1 800 000 MGA. Une prime mensuelle de 200 000 MGA est également prévue.',
          type: 'standard'
        },
        {
          id: 4,
          titre: 'Horaires de travail',
          description: 'L\'horaire de travail est de 40 heures par semaine, réparties du lundi au vendredi de 8h00 à 17h00 avec une pause déjeuner d\'une heure.',
          type: 'standard'
        },
        {
          id: 5,
          titre: 'Télétravail',
          description: 'Le salarié bénéficie de la possibilité de télétravailler 2 jours par semaine, sous réserve de l\'accord du responsable hiérarchique.',
          type: 'particuliere'
        },
        {
          id: 6,
          titre: 'Confidentialité',
          description: 'Le salarié s\'engage à respecter la confidentialité des informations de l\'entreprise pendant et après l\'exécution du contrat.',
          type: 'confidentialite'
        }
      ];

      this.isLoading = false;
    }, 500);
  }

  goBack(): void {
    this.router.navigate(['/contrats']);
  }

  viewEmployeDetails(): void {
    if (this.contrat) {
      this.router.navigate(['/employes', this.contrat.employeId]);
    }
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
    if (jours <= 7) return 'border-red-500';
    if (jours <= 30) return 'border-orange-500';
    return 'border-green-500';
  }

  getAlerteMessage(jours: number | undefined): string {
    if (jours === undefined) return 'Contrat à durée indéterminée';
    if (jours < 0) return `Contrat expiré depuis ${-jours} jour(s)`;
    if (jours === 0) return 'Contrat expire aujourd\'hui !';
    if (jours <= 7) return `⚠️ Contrat expire dans ${jours} jour(s) !`;
    if (jours <= 30) return `Contrat expire dans ${jours} jour(s)`;
    return `Contrat expire dans ${jours} jour(s)`;
  }

  getClauseIcon(type: string): string {
    switch (type) {
      case 'standard': return '📋';
      case 'particuliere': return '⭐';
      case 'confidentialite': return '🔒';
      case 'non-concurrence': return '🚫';
      default: return '📄';
    }
  }

  getClauseClass(type: string): string {
    switch (type) {
      case 'standard': return 'bg-blue-50 border-blue-200';
      case 'particuliere': return 'bg-purple-50 border-purple-200';
      case 'confidentialite': return 'bg-red-50 border-red-200';
      case 'non-concurrence': return 'bg-orange-50 border-orange-200';
      default: return 'bg-gray-50 border-gray-200';
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

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EmployeService } from '../../../services/employe.service';
import { EmployeDetails, Document, HistoriquePoste, ContactUrgence } from '../../../models/employe-details.model';

@Component({
  selector: 'app-employe-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './employe-detail.component.html',
  styleUrls: ['./employe-detail.component.css']
})
export class EmployeDetailComponent implements OnInit {
  employe: EmployeDetails | null = null;
  documents: Document[] = [];
  historique: HistoriquePoste[] = [];
  contactsUrgence: ContactUrgence[] = [];
  
  isLoading: boolean = true;
  errorMessage: string = '';
  activeTab: string = 'infos'; // infos, poste, contrat, documents, historique, bancaire

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeService: EmployeService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.loadEmployeDetails(id);
  }

  loadEmployeDetails(id: number): void {
    this.isLoading = true;

    // MODE TEST : Données fictives
    setTimeout(() => {
      this.employe = {
        id: id,
        matricule: 'EMP001',
        nom: 'Rakoto',
        prenom: 'Jean',
        email: 'jean.rakoto@humania.mg',
        telephone: '020 12 345 67',
        telephoneMobile: '034 12 345 67',
        dateNaissance: new Date('1990-05-15'),
        dateEmbauche: new Date('2020-01-10'),
        statut: 'actif',
        photo: 'https://ui-avatars.com/api/?name=Jean+Rakoto&size=200',
        
        // Informations personnelles
        adresse: '123 Avenue de l\'Indépendance',
        ville: 'Antananarivo',
        codePostal: '101',
        situationFamiliale: 'Marié',
        nombreEnfants: 2,
        cin: '101 234 567 890',
        lieuNaissance: 'Antananarivo',
        nationalite: 'Malagasy',
        
        // Poste actuel
        posteActuel: 'Développeur Senior',
        departement: 'Informatique',
        dateDebutPoste: new Date('2022-06-01'),
        salaireActuel: 2500000,
        typeAffectation: 'Permanent',
        
        // Contrat
        typeContrat: 'CDI',
        dateDebutContrat: new Date('2020-01-10'),
        dateFinContrat: undefined,
        nombreRenouvellements: 0,
        numeroCnaps: 'CNAPS-123456',
        numeroOstie: 'OSTIE-789012',
        
        // Informations bancaires
        banque: 'BNI Madagascar',
        numeroCompte: '00123456789',
        rib: 'MG12 3456 7890 1234 5678 9012'
      };

      this.documents = [
        {
          id: 1,
          typeDocument: 'CIN',
          numeroDocument: '101 234 567 890',
          dateEmission: new Date('2018-03-15'),
          dateExpiration: undefined,
          statut: 'valide',
          fichierPath: '/documents/cin_001.pdf'
        },
        {
          id: 2,
          typeDocument: 'Diplôme',
          numeroDocument: 'DIP-2015-001',
          dateEmission: new Date('2015-07-20'),
          dateExpiration: undefined,
          statut: 'valide',
          fichierPath: '/documents/diplome_001.pdf'
        },
        {
          id: 3,
          typeDocument: 'Certificat Médical',
          numeroDocument: 'CM-2024-001',
          dateEmission: new Date('2024-01-10'),
          dateExpiration: new Date('2025-01-10'),
          statut: 'valide',
          fichierPath: '/documents/certif_medical_001.pdf'
        }
      ];

      this.historique = [
        {
          id: 1,
          poste: 'Développeur Senior',
          departement: 'Informatique',
          dateDebut: new Date('2022-06-01'),
          dateFin: undefined,
          typeMouvement: 'Promotion',
          motif: 'Excellentes performances'
        },
        {
          id: 2,
          poste: 'Développeur Junior',
          departement: 'Informatique',
          dateDebut: new Date('2020-01-10'),
          dateFin: new Date('2022-05-31'),
          typeMouvement: 'Embauche',
          motif: 'Premier poste'
        }
      ];

      this.contactsUrgence = [
        {
          id: 1,
          nom: 'Rakoto',
          prenom: 'Marie',
          relation: 'Conjoint',
          telephone: '033 98 765 43',
          priorite: 1
        },
        {
          id: 2,
          nom: 'Rakoto',
          prenom: 'Pierre',
          relation: 'Frère',
          telephone: '032 11 222 33',
          priorite: 2
        }
      ];

      this.isLoading = false;
    }, 500);
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  goBack(): void {
    this.router.navigate(['/employes']);
  }

  getStatutClass(statut: string): string {
    switch (statut.toLowerCase()) {
      case 'actif':
        return 'bg-green-100 text-green-800';
      case 'valide':
        return 'bg-green-100 text-green-800';
      case 'expire':
        return 'bg-red-100 text-red-800';
      case 'en_attente':
        return 'bg-yellow-100 text-yellow-800';
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
}

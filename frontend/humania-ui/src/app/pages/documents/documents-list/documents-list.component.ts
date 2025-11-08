import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { DocumentService } from '../../../services/document.service';
import { Document } from '../../../models/document.model';

@Component({
  selector: 'app-documents-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './documents-list.component.html',
  styleUrls: ['./documents-list.component.css']
})
export class DocumentsListComponent implements OnInit {
  documents: Document[] = [];
  filteredDocuments: Document[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';
  
  // Filtres
  searchTerm: string = '';
  selectedType: string = '';
  selectedStatut: string = '';
  selectedEmploye: string = '';

  constructor(
    private documentService: DocumentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDocuments();
  }

  loadDocuments(): void {
    this.isLoading = true;
    
    // MODE TEST : Données fictives (tous les documents)
    setTimeout(() => {
      this.documents = [
        // Documents valides
        {
          id: 1,
          employeId: 1,
          employeNom: 'Rakoto',
          employePrenom: 'Jean',
          employeMatricule: 'EMP001',
          typeDocument: 'CIN',
          numeroDocument: '101 234 567 890',
          dateEmission: new Date('2018-03-15'),
          dateExpiration: undefined,
          statut: 'valide',
          fichierPath: '/documents/cin_001.pdf',
          remarques: undefined,
          joursAvantExpiration: undefined
        },
        {
          id: 2,
          employeId: 1,
          employeNom: 'Rakoto',
          employePrenom: 'Jean',
          employeMatricule: 'EMP001',
          typeDocument: 'Diplôme',
          numeroDocument: 'DIP-2015-001',
          dateEmission: new Date('2015-07-20'),
          dateExpiration: undefined,
          statut: 'valide',
          fichierPath: '/documents/diplome_001.pdf',
          remarques: undefined,
          joursAvantExpiration: undefined
        },
        {
          id: 3,
          employeId: 1,
          employeNom: 'Rakoto',
          employePrenom: 'Jean',
          employeMatricule: 'EMP001',
          typeDocument: 'Certificat Médical',
          numeroDocument: 'CM-2023-001',
          dateEmission: new Date('2023-12-10'),
          dateExpiration: new Date('2024-12-10'),
          statut: 'expire',
          fichierPath: '/documents/cm_001.pdf',
          remarques: 'Renouvellement urgent requis',
          joursAvantExpiration: -2
        },
        {
          id: 4,
          employeId: 2,
          employeNom: 'Razafy',
          employePrenom: 'Marie',
          employeMatricule: 'EMP002',
          typeDocument: 'CIN',
          numeroDocument: '102 345 678 901',
          dateEmission: new Date('2019-05-10'),
          dateExpiration: undefined,
          statut: 'valide',
          fichierPath: '/documents/cin_002.pdf',
          remarques: undefined,
          joursAvantExpiration: undefined
        },
        {
          id: 5,
          employeId: 2,
          employeNom: 'Razafy',
          employePrenom: 'Marie',
          employeMatricule: 'EMP002',
          typeDocument: 'Permis de Conduire',
          numeroDocument: 'PC-123456',
          dateEmission: new Date('2020-03-15'),
          dateExpiration: new Date('2024-12-20'),
          statut: 'a_renouveler',
          fichierPath: '/documents/pc_002.pdf',
          remarques: undefined,
          joursAvantExpiration: 8
        },
        {
          id: 6,
          employeId: 3,
          employeNom: 'Andria',
          employePrenom: 'Paul',
          employeMatricule: 'EMP003',
          typeDocument: 'CIN',
          numeroDocument: '103 456 789 012',
          dateEmission: new Date('2020-08-20'),
          dateExpiration: undefined,
          statut: 'valide',
          fichierPath: '/documents/cin_003.pdf',
          remarques: undefined,
          joursAvantExpiration: undefined
        },
        {
          id: 7,
          employeId: 3,
          employeNom: 'Andria',
          employePrenom: 'Paul',
          employeMatricule: 'EMP003',
          typeDocument: 'Certificat de Travail',
          numeroDocument: 'CT-2024-003',
          dateEmission: new Date('2024-06-01'),
          dateExpiration: new Date('2024-12-31'),
          statut: 'a_renouveler',
          fichierPath: '/documents/ct_003.pdf',
          remarques: undefined,
          joursAvantExpiration: 19
        },
        {
          id: 8,
          employeId: 4,
          employeNom: 'Rabe',
          employePrenom: 'Sophie',
          employeMatricule: 'EMP004',
          typeDocument: 'CIN',
          numeroDocument: '104 567 890 123',
          dateEmission: new Date('2021-02-10'),
          dateExpiration: undefined,
          statut: 'valide',
          fichierPath: '/documents/cin_004.pdf',
          remarques: undefined,
          joursAvantExpiration: undefined
        },
        {
          id: 9,
          employeId: 4,
          employeNom: 'Rabe',
          employePrenom: 'Sophie',
          employeMatricule: 'EMP004',
          typeDocument: 'Attestation Formation',
          numeroDocument: 'AF-2024-004',
          dateEmission: new Date('2024-09-01'),
          dateExpiration: new Date('2025-01-15'),
          statut: 'valide',
          fichierPath: '/documents/af_004.pdf',
          remarques: 'Formation sécurité',
          joursAvantExpiration: 33
        },
        {
          id: 10,
          employeId: 5,
          employeNom: 'Randria',
          employePrenom: 'Michel',
          employeMatricule: 'EMP005',
          typeDocument: 'CIN',
          numeroDocument: '105 678 901 234',
          dateEmission: new Date('2017-11-05'),
          dateExpiration: undefined,
          statut: 'valide',
          fichierPath: '/documents/cin_005.pdf',
          remarques: undefined,
          joursAvantExpiration: undefined
        },
        {
          id: 11,
          employeId: 5,
          employeNom: 'Randria',
          employePrenom: 'Michel',
          employeMatricule: 'EMP005',
          typeDocument: 'Certificat Médical',
          numeroDocument: 'CM-2024-005',
          dateEmission: new Date('2024-01-10'),
          dateExpiration: new Date('2024-12-15'),
          statut: 'a_renouveler',
          fichierPath: '/documents/cm_005.pdf',
          remarques: undefined,
          joursAvantExpiration: 3
        }
      ];
      
      this.filteredDocuments = [...this.documents];
      this.isLoading = false;
    }, 500);
  }

  applyFilters(): void {
    this.filteredDocuments = this.documents.filter(doc => {
      const matchSearch = !this.searchTerm || 
        doc.employeNom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        doc.employePrenom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        doc.employeMatricule.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        doc.typeDocument.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        (doc.numeroDocument && doc.numeroDocument.toLowerCase().includes(this.searchTerm.toLowerCase()));
      
      const matchType = !this.selectedType || 
        doc.typeDocument === this.selectedType;
      
      const matchStatut = !this.selectedStatut || 
        doc.statut === this.selectedStatut;
      
      const matchEmploye = !this.selectedEmploye || 
        `${doc.employePrenom} ${doc.employeNom}` === this.selectedEmploye;
      
      return matchSearch && matchType && matchStatut && matchEmploye;
    });
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.selectedType = '';
    this.selectedStatut = '';
    this.selectedEmploye = '';
    this.filteredDocuments = [...this.documents];
  }

  viewEmployeDetails(employeId: number): void {
    this.router.navigate(['/employes', employeId]);
  }

  getStatutClass(statut: string): string {
    switch (statut.toLowerCase()) {
      case 'valide':
        return 'bg-green-100 text-green-800';
      case 'expire':
        return 'bg-red-100 text-red-800';
      case 'a_renouveler':
        return 'bg-orange-100 text-orange-800';
      case 'en_attente':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  getUniqueEmployes(): string[] {
    const employes = this.documents.map(d => `${d.employePrenom} ${d.employeNom}`);
    return [...new Set(employes)].sort();
  }

  countByStatut(statut: string): number {
    return this.documents.filter(d => d.statut === statut).length;
  }
}

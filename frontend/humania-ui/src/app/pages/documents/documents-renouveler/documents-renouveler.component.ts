import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { DocumentService } from '../../../services/document.service';
import { Document } from '../../../models/document.model';

@Component({
  selector: 'app-documents-renouveler',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './documents-renouveler.component.html',
  styleUrls: ['./documents-renouveler.component.css']
})
export class DocumentsRenouvelerComponent implements OnInit {
  documents: Document[] = [];
  filteredDocuments: Document[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';
  
  // Filtres
  searchTerm: string = '';
  selectedType: string = '';
  selectedStatut: string = '';
  showUrgentOnly: boolean = false;

  constructor(
    private documentService: DocumentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDocuments();
  }

  loadDocuments(): void {
    this.isLoading = true;
    
    // MODE TEST : Données fictives
    setTimeout(() => {
      const today = new Date();
      
      this.documents = [
        {
          id: 1,
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
          id: 2,
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
          id: 3,
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
          id: 4,
          employeId: 4,
          employeNom: 'Rabe',
          employePrenom: 'Sophie',
          employeMatricule: 'EMP004',
          typeDocument: 'Attestation Formation',
          numeroDocument: 'AF-2024-004',
          dateEmission: new Date('2024-09-01'),
          dateExpiration: new Date('2025-01-15'),
          statut: 'a_renouveler',
          fichierPath: '/documents/af_004.pdf',
          remarques: 'Formation sécurité',
          joursAvantExpiration: 33
        },
        {
          id: 5,
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
        },
        {
          id: 6,
          employeId: 1,
          employeNom: 'Rakoto',
          employePrenom: 'Jean',
          employeMatricule: 'EMP001',
          typeDocument: 'Casier Judiciaire',
          numeroDocument: 'CJ-2023-001',
          dateEmission: new Date('2023-11-20'),
          dateExpiration: new Date('2024-11-20'),
          statut: 'expire',
          fichierPath: '/documents/cj_001.pdf',
          remarques: 'Expiré depuis 22 jours',
          joursAvantExpiration: -22
        },
        {
          id: 7,
          employeId: 6,
          employeNom: 'Rasoanaivo',
          employePrenom: 'Luc',
          employeMatricule: 'EMP006',
          typeDocument: 'Attestation Assurance',
          numeroDocument: 'AA-2024-006',
          dateEmission: new Date('2024-07-01'),
          dateExpiration: new Date('2024-12-25'),
          statut: 'a_renouveler',
          fichierPath: '/documents/aa_006.pdf',
          remarques: undefined,
          joursAvantExpiration: 13
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
      
      const matchUrgent = !this.showUrgentOnly || 
        (doc.joursAvantExpiration !== undefined && doc.joursAvantExpiration <= 7);
      
      return matchSearch && matchType && matchStatut && matchUrgent;
    });
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.selectedType = '';
    this.selectedStatut = '';
    this.showUrgentOnly = false;
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

  getUrgenceClass(jours: number | undefined): string {
    if (jours === undefined) return '';
    if (jours < 0) return 'bg-red-50 border-red-200';
    if (jours <= 7) return 'bg-orange-50 border-orange-200';
    if (jours <= 30) return 'bg-yellow-50 border-yellow-200';
    return '';
  }

  getUrgenceIcon(jours: number | undefined): string {
    if (jours === undefined) return '';
    if (jours < 0) return '🔴';
    if (jours <= 7) return '⚠️';
    if (jours <= 30) return '⏰';
    return '';
  }

  getUrgenceLabel(jours: number | undefined): string {
    if (jours === undefined) return '';
    if (jours < 0) return 'Expiré';
    if (jours <= 7) return 'Urgent';
    if (jours <= 30) return 'À renouveler';
    return '';
  }

  countDocumentsUrgents(): number {
    return this.documents.filter(d => 
      d.joursAvantExpiration !== undefined && 
      d.joursAvantExpiration <= 7
    ).length;
  }

  countDocumentsExpires(): number {
    return this.documents.filter(d => 
      d.joursAvantExpiration !== undefined && 
      d.joursAvantExpiration < 0
    ).length;
  }
}

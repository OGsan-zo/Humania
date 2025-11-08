import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { EmployeService } from '../../../services/employe.service';
import { Employe, EmployeFilters } from '../../../models/employe.model';

@Component({
  selector: 'app-employe-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './employe-list.component.html',
  styleUrls: ['./employe-list.component.css']
})
export class EmployeListComponent implements OnInit {
  employes: Employe[] = [];
  filteredEmployes: Employe[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';
  
  // Filtres
  searchTerm: string = '';
  selectedDepartement: string = '';
  selectedStatut: string = '';

  constructor(
    private employeService: EmployeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadEmployes();
  }

  loadEmployes(): void {
    this.isLoading = true;
    
    // MODE TEST : Données fictives
    setTimeout(() => {
      this.employes = [
        {
          id: 1,
          matricule: 'EMP001',
          nom: 'Rakoto',
          prenom: 'Jean',
          email: 'jean.rakoto@humania.mg',
          telephone: '034 12 345 67',
          dateNaissance: new Date('1990-05-15'),
          dateEmbauche: new Date('2020-01-10'),
          posteActuel: 'Développeur Senior',
          departement: 'Informatique',
          statut: 'actif'
        },
        {
          id: 2,
          matricule: 'EMP002',
          nom: 'Razafy',
          prenom: 'Marie',
          email: 'marie.razafy@humania.mg',
          telephone: '033 98 765 43',
          dateNaissance: new Date('1988-08-22'),
          dateEmbauche: new Date('2019-03-15'),
          posteActuel: 'Chef de Projet',
          departement: 'Gestion de Projet',
          statut: 'actif'
        },
        {
          id: 3,
          matricule: 'EMP003',
          nom: 'Andria',
          prenom: 'Paul',
          email: 'paul.andria@humania.mg',
          telephone: '032 11 222 33',
          dateNaissance: new Date('1992-12-03'),
          dateEmbauche: new Date('2021-06-01'),
          posteActuel: 'Comptable',
          departement: 'Finance',
          statut: 'actif'
        },
        {
          id: 4,
          matricule: 'EMP004',
          nom: 'Rabe',
          prenom: 'Sophie',
          email: 'sophie.rabe@humania.mg',
          telephone: '034 55 666 77',
          dateNaissance: new Date('1995-03-18'),
          dateEmbauche: new Date('2022-09-12'),
          posteActuel: 'Designer UI/UX',
          departement: 'Design',
          statut: 'actif'
        },
        {
          id: 5,
          matricule: 'EMP005',
          nom: 'Randria',
          prenom: 'Michel',
          email: 'michel.randria@humania.mg',
          telephone: '033 44 888 99',
          dateNaissance: new Date('1987-07-25'),
          dateEmbauche: new Date('2018-11-20'),
          posteActuel: 'Responsable RH',
          departement: 'Ressources Humaines',
          statut: 'actif'
        }
      ];
      
      this.filteredEmployes = [...this.employes];
      this.isLoading = false;
    }, 500);
  }

  applyFilters(): void {
    this.filteredEmployes = this.employes.filter(emp => {
      const matchSearch = !this.searchTerm || 
        emp.nom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        emp.prenom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        emp.matricule.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        emp.email.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchDepartement = !this.selectedDepartement || 
        emp.departement === this.selectedDepartement;
      
      const matchStatut = !this.selectedStatut || 
        emp.statut === this.selectedStatut;
      
      return matchSearch && matchDepartement && matchStatut;
    });
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.selectedDepartement = '';
    this.selectedStatut = '';
    this.filteredEmployes = [...this.employes];
  }

  viewDetails(id: number): void {
    this.router.navigate(['/employes', id]);
  }

  getStatutClass(statut: string): string {
    switch (statut.toLowerCase()) {
      case 'actif':
        return 'bg-green-100 text-green-800';
      case 'inactif':
        return 'bg-gray-100 text-gray-800';
      case 'suspendu':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }
}

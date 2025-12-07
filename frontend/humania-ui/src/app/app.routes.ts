import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EmployeListComponent } from './pages/employes/employe-list/employe-list.component';
import { EmployeDetailComponent } from './pages/employes/employe-detail/employe-detail.component';
import { PosteListComponent } from './pages/postes/poste-list/poste-list.component';
import { PosteDetailComponent } from './pages/postes/poste-detail/poste-detail.component';
import { ContratListComponent } from './pages/contrats/contrat-list/contrat-list.component';
import { ContratDetailComponent } from './pages/contrats/contrat-detail/contrat-detail.component';
import { DocumentsRenouvelerComponent } from './pages/documents/documents-renouveler/documents-renouveler.component';
import { DocumentsListComponent } from './pages/documents/documents-list/documents-list.component';
import { MouvementListComponent } from './pages/mouvements/mouvement-list/mouvement-list.component';
import { DepartementListComponent } from './pages/departements/departement-list/departement-list.component';
import { DepartementDetailComponent } from './pages/departements/departement-detail/departement-detail.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'employes', component: EmployeListComponent, canActivate: [authGuard] },
  { path: 'employes/:id', component: EmployeDetailComponent, canActivate: [authGuard] },
  { path: 'postes', component: PosteListComponent, canActivate: [authGuard] },
  { path: 'postes/:id', component: PosteDetailComponent, canActivate: [authGuard] },
  { path: 'contrats', component: ContratListComponent, canActivate: [authGuard] },
  { path: 'contrats/:id', component: ContratDetailComponent, canActivate: [authGuard] },
  { path: 'documents/renouveler', component: DocumentsRenouvelerComponent, canActivate: [authGuard] },
  { path: 'documents', component: DocumentsListComponent, canActivate: [authGuard] },
  { path: 'historique', component: MouvementListComponent, canActivate: [authGuard] },
  { path: 'departements', component: DepartementListComponent, canActivate: [authGuard] },
  { path: 'departements/:id', component: DepartementDetailComponent, canActivate: [authGuard] }
];
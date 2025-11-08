import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EmployeListComponent } from './pages/employes/employe-list/employe-list.component';
import { EmployeDetailComponent } from './pages/employes/employe-detail/employe-detail.component';
import { PosteListComponent } from './pages/postes/poste-list/poste-list.component';
import { PosteDetailComponent } from './pages/postes/poste-detail/poste-detail.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'employes', component: EmployeListComponent, canActivate: [authGuard] },
  { path: 'employes/:id', component: EmployeDetailComponent, canActivate: [authGuard] },
  { path: 'postes', component: PosteListComponent, canActivate: [authGuard] },
  { path: 'postes/:id', component: PosteDetailComponent, canActivate: [authGuard] }
];
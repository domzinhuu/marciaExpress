import { UserDetailComponent } from './pages/user-detail/user-detail.component';
import { RegisterResumeComponent } from './pages/register-resume/register-resume.component';
import { RegisterSavedComponent } from './shared/register-saved/register-saved.component';
import { LoggedInGuard } from './security/loggedin.guard';
import { LoginComponent } from './security/login/login.component';
import { RegisterListComponent } from './pages/register-list/register-list.component';
import { CardBillComponent } from './pages/card-bill/card-bill.component';
import { CardFormComponent } from './pages/card-form/card-form.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserFormComponent } from './pages/user-form/user-form.component';
import { CardListComponent } from './pages/card-list/card-list.component';
import { NotifyComponent } from './pages/notify/notify.component';
import { CardDetailComponent } from './pages/card-detail/card-detail.component';
import { RegisterFormComponent } from './pages/register-form/register-form.component';
import { HomeComponent } from './pages/home/home.component';
import { Routes } from '@angular/router'




export const ROUTES: Routes = [
    { path: '', redirectTo: "/home", pathMatch: 'full' },
    { path: 'login/:to', component: LoginComponent },
    { path: 'login', component: LoginComponent },

    // Rotas protegidas
    { path: 'home', component: HomeComponent, canActivate: [LoggedInGuard] },
    { path: 'saved', component: RegisterSavedComponent, canActivate: [LoggedInGuard] },
    { path: 'users/add', component: UserFormComponent, canActivate: [LoggedInGuard] },
    { path: 'users/details/:id', component: UserDetailComponent, canActivate: [LoggedInGuard] },
    { path: 'users/edit/:id', component: UserFormComponent, canActivate: [LoggedInGuard] },
    { path: 'users', component: UserListComponent, canActivate: [LoggedInGuard] },
    { path: 'cards/add', component: CardFormComponent, canActivate: [LoggedInGuard] },
    { path: 'cards/bills', component: CardBillComponent, canActivate: [LoggedInGuard] },
    { path: 'cards/:id', component: CardFormComponent, canActivate: [LoggedInGuard] },
    { path: 'cards/detail/:id', component: CardDetailComponent, canActivate: [LoggedInGuard] },
    { path: 'cards', component: CardListComponent, canActivate: [LoggedInGuard] },
    { path: 'registers/add', component: RegisterFormComponent, canActivate: [LoggedInGuard] },
    { path: 'registers/resume', component: RegisterResumeComponent, canActivate: [LoggedInGuard] },
    { path: 'registers', component: RegisterListComponent, canActivate: [LoggedInGuard] },
    { path: 'notify', component: NotifyComponent, canActivate: [LoggedInGuard] },
    // Fim das rotas Protegidas
]
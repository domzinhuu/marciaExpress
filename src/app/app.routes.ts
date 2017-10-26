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
import { CardDetailComponent } from './pages/card-detail/card-detail.component';
import { RegisterFormComponent } from './pages/register-form/register-form.component';
import { HomeComponent } from './pages/home/home.component';
import { Routes } from '@angular/router'




export const ROUTES: Routes = [
    { path: '', redirectTo: "/home", pathMatch: 'full' },
    { path: 'login/:to', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    {
        path: '', canActivate: [LoggedInGuard], children: [
            { path: 'home', component: HomeComponent },
            { path: 'saved', component: RegisterSavedComponent },
            { path: 'users/add', component: UserFormComponent },
            { path: 'users/details/:id', component: UserDetailComponent },
            { path: 'users/edit/:id', component: UserFormComponent },
            { path: 'users', component: UserListComponent },
            { path: 'cards/add', component: CardFormComponent },
            { path: 'cards/bills', component: CardBillComponent },
            { path: 'cards/:id', component: CardFormComponent },
            { path: 'cards/detail/:id', component: CardDetailComponent },
            { path: 'cards', component: CardListComponent },
            { path: 'registers/add', component: RegisterFormComponent },
            { path: 'registers/resume', component: RegisterResumeComponent },
            { path: 'registers', component: RegisterListComponent },
        ]
    }
]
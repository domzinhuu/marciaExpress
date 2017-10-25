import { HomeService } from './providers/home.service';
import { ApplicationErrorHandler } from './app.error-handler';
import { AuthInterceptor } from './security/interceptors/auth.interceptor';
import { RegisterService } from './providers/register.service';
import { CardService } from './providers/card.service';
import { LoggedInGuard } from './security/loggedin.guard';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthenticationService } from './providers/authentication.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuarioService } from './providers/usuario.service';
import { SearchForm } from './components/search-form/search-form-component';
import { ROUTES } from './app.routes';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HomeComponent } from './pages/home/home.component';
import { UserFormComponent } from './pages/user-form/user-form.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { CardFormComponent } from './pages/card-form/card-form.component';
import { CardListComponent } from './pages/card-list/card-list.component';
import { CardBillComponent } from './pages/card-bill/card-bill.component';
import { RegisterFormComponent } from './pages/register-form/register-form.component';
import { RegisterListComponent } from './pages/register-list/register-list.component';
import { LoginComponent } from './security/login/login.component';
import { MessageComponent } from './components/message/message.component';

import { InputMaskModule } from 'ng2-inputmask';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { CurrencyMaskConfig, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask/src/currency-mask.config'
import { ComboUsuarioComponent } from './components/combo-usuario/combo-usuario.component';
import { ComboCartaoComponent } from './components/combo-cartao/combo-cartao.component';
import { ComboMesComponent } from './components/combo-mes/combo-mes.component';
import { RegisterSavedComponent } from './shared/register-saved/register-saved.component';
import { RegisterTableComponent } from './components/register-table/register-table.component';
import { RegisterResumeComponent } from './pages/register-resume/register-resume.component';
import { UserDetailComponent } from './pages/user-detail/user-detail.component';
import { OnlyLastPipe } from './shared/pipes/only-last.pipe';
import { CardDetailComponent } from './pages/card-detail/card-detail.component'


export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "right",
  allowNegative: false,
  allowZero: true,
  decimal: ",",
  precision: 2,
  prefix: "R$ ",
  suffix: "",
  thousands: "."
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    HomeComponent,
    UserFormComponent,
    UserListComponent,
    CardFormComponent,
    CardListComponent,
    CardBillComponent,
    RegisterFormComponent,
    RegisterListComponent,
    SearchForm,
    LoginComponent,
    MessageComponent,
    ComboUsuarioComponent,
    ComboCartaoComponent,
    ComboMesComponent,
    RegisterSavedComponent,
    RegisterTableComponent,
    RegisterResumeComponent,
    UserDetailComponent,
    OnlyLastPipe,
    CardDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    InputMaskModule,
    CurrencyMaskModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    UsuarioService,
    AuthenticationService,
    LoggedInGuard,
    CardService,
    RegisterService,
    HomeService,
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig },
    { provide: ErrorHandler, useClass: ApplicationErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

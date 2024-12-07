import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CatalogComponent } from './catalog/catalog.component';
import { ListYourCarComponent } from './list-your-car/list-your-car.component';
import { SearchComponent } from './search/search.component';
import { ProfileComponent } from './user/profile/profile.component';
import { ContactComponent } from './contact/contact.component';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {path: '', redirectTo: "/home", pathMatch: "full"},
    {path: "home", component: HomeComponent},

    {path: 'catalog', children:[
        {path: '', component: CatalogComponent},
        {path: ':carId', 
        component: DetailsComponent,
        }
    ]},
    {path: 'edit/:carId', component:EditComponent, canActivate:[authGuard]},
    {path: 'list', component: ListYourCarComponent},
    {path: 'search', component: SearchComponent},
    {path: 'contacts', component:ContactComponent},
    
    {path: 'profile', component: ProfileComponent, canActivate:[authGuard]},
    {path: 'register', component: RegisterComponent, canActivate:[authGuard]},
    {path: 'login', component: LoginComponent, canActivate:[authGuard]},

    {path: "404", component: NotFoundComponent},
    {path: "**", redirectTo: "/404" }
];

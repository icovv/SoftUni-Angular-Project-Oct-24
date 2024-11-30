import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CatalogComponent } from './catalog/catalog.component';
import { ListYourCarComponent } from './list-your-car/list-your-car.component';
import { SearchComponent } from './search/search.component';
import { ProfileComponent } from './user/profile/profile.component';
import { ContactComponent } from './contact/contact.component';
import { RegisterComponent } from './user/register/register.component';

export const routes: Routes = [
    {path: '', redirectTo: "/home", pathMatch: "full"},
    {path: "home", component: HomeComponent},

    {path: 'catalog', component: CatalogComponent},
    {path: 'list', component: ListYourCarComponent},
    {path: 'search', component: SearchComponent},
    {path: 'contacts', component:ContactComponent},
    
    {path: 'profile', component: ProfileComponent},
    {path: 'register', component: RegisterComponent}
];

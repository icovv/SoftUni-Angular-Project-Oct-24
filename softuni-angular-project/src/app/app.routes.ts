import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CatalogComponent } from './catalog/catalog.component';
import { ListYourCarComponent } from './list-your-car/list-your-car.component';
import { SearchComponent } from './search/search.component';
import { ProfileComponent } from './user/profile/profile.component';

export const routes: Routes = [
    {path: '', redirectTo: "/home", pathMatch: "full"},
    {path: "home", component: HomeComponent},

    {path: 'catalog', component: CatalogComponent},
    {path: 'list', component: ListYourCarComponent},
    {path: 'search', component: SearchComponent},
    
    {path: 'profile', component: ProfileComponent}
];

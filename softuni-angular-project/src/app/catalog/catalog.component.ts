import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../services/user.service';
import { ApiService } from '../services/api.service';
import { Cars } from '../types/cars';
import { ErrorsComponent } from '../core/errors/errors.component';
import { CatalogSingleItemComponent } from './catalog-single-item/catalog-single-item.component';
import { LoaderComponent } from '../core/loader/loader.component';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [ErrorsComponent, CatalogSingleItemComponent, LoaderComponent],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent implements OnInit {
  get isLoggedIn(): boolean{
    return this.userService.isLogged;
  }

  get loading(): boolean{
    return this.cars.length <= 0 ? true : false
  }

  cars:Cars[] = [];
  errorContainer:string[] = [];
  constructor(private userService: UserService, private api: ApiService){

  }

  onAnimationEnd(data:boolean): void{
    if(data == true){
      this.errorContainer = [];
      return
    }
  }

  ngOnInit(): void {
    this.api.getAllCars().subscribe({
      next: (data) => {
        this.cars = data;
      },
      error: (err) => {
        this.errorContainer?.push(err);
      }
    })
    
  }
}

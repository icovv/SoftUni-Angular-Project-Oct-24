import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { searchValidator } from '../utils/search.validator';
import { ErrorsComponent } from '../core/errors/errors.component';
import { ApiService } from '../services/api.service';
import { UserService } from '../services/user.service';
import { Cars } from '../types/cars';
import { SearchSingleItemComponent } from './search-single-item/search-single-item.component';
import { LoaderComponent } from '../core/loader/loader.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule, ErrorsComponent, SearchSingleItemComponent, LoaderComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit{
  errorContainer:string[] = [];
  loading: boolean = true;
  form = new FormGroup({
    search: new FormControl('',[]),
    dropdown: new FormControl('',[Validators.required])
  },{
    validators:searchValidator()
  })

  cars:Cars[] = [];
  
  get isLoggedIn():boolean{
    return this.userService.isLogged;
  }

  constructor(private api: ApiService, private userService: UserService){

  }

  ngOnInit(): void {
    this.api.getAllCars().subscribe({
      next: (data) => {
        this.cars = data;
        this.loading = false;
      },
      error: (err) => {
        this.loading = true;
        this.errorContainer?.push(err);
      }
    })
  }


  onAnimationEnd(data:boolean){
    if(data){
      this.errorContainer = [];
      return;
  }
}
  
  submit(){
    if(this.form?.errors?.['isInvalid']){
    this.errorContainer.push(this.form?.errors?.['isInvalid'])
    this.form.get('search')?.setValue('');
    return
    }
    
    this.api.getAllCars().subscribe({
      next: (data) => {
          this.cars = [];
          let searchParam = this.form.get('search')?.value
          if (this.form.get('dropdown')?.value == `carModel` || this.form.get('dropdown')?.value == 'carBrand'){
            if (searchParam == ''){
              return;
            }
            searchParam = searchParam!.toLowerCase();
          }
          if (searchParam == ``){
              return data;
          } else if (this.form.get('dropdown')?.value == `carModel`){
              this.cars = data.filter(car => car.carModel.toLowerCase().includes(searchParam!.toLowerCase()))
          } else if (this.form.get('dropdown')?.value == `carBrand`){
              this.cars = data.filter(car => car.carBrand.toLowerCase().includes(searchParam!.toLowerCase()))
          } else if (this.form.get('dropdown')?.value == `horsePowerMore`){
              this.cars = data.filter(car => car.horsePower >= Number(searchParam))
          } else if (this.form.get('dropdown')?.value == `horsePowerLess`){
              this.cars = data.filter(car => car.horsePower <= Number(searchParam))
          }
          
          return this.cars;
      }, 
      error: (err) => {
        this.loading = true;
        this.errorContainer.push(err)
      }

    })
  }

  clear(){
    this.form.get('search')?.setValue('');
    this.form.get('dropdown')?.setValue('');
    this.api.getAllCars().subscribe({
      next: (data) => {
        this.cars = data;
        this.loading = false;
      },
      error: (err) => {
        this.loading = true;
        this.errorContainer?.push(err);
      }
    })
  }
}

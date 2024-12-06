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
  form = new FormGroup({
    search: new FormControl('',[]),
    dropdown: new FormControl('',[Validators.required])
  },{
    validators:searchValidator()
  })

  get loading(): boolean{
    return this.cars.length <= 0 ? true : false
  }

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
        console.log(this.cars)
      },
      error: (err) => {
        console.log(`this is your err ${err}`)
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
    this.errorContainer.push(this.form?.errors?.['isInvalid'])
    console.log(this.errorContainer)
  }

  clear(){
    this.form.get('search')?.setValue('');
    this.form.get('dropdown')?.setValue('');
  }
}

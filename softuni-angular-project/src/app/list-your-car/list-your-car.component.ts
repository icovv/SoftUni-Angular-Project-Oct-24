import { Component, model } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { errorHandlerValidator } from '../utils/errorHandler';
import { fuelValidator } from '../utils/fuel.validator';
import { yearValidator } from '../utils/year.validator';
import { ErrorsComponent } from '../core/errors/errors.component';
import { ApiService } from '../services/api.service';
import { UserService } from '../services/user.service';
import { Cars } from '../types/cars';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-your-car',
  standalone: true,
  imports: [ReactiveFormsModule, ErrorsComponent],
  templateUrl: './list-your-car.component.html',
  styleUrl: './list-your-car.component.css'
})
export class ListYourCarComponent {
  errorContainer:string[] = [];
  form = new FormGroup({
    brand: new FormControl("",[Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]),
    year: new FormControl("",[Validators.required, Validators.pattern(/\d+/), yearValidator()]),
    model: new FormControl("",[Validators.required]),
    capacity: new FormControl("",[Validators.required, Validators.pattern(/\d+/), Validators.min(0)]),
    power: new FormControl("",[Validators.required, Validators.pattern(/\d+/), Validators.min(0)]),
    fuel: new FormControl("",[ Validators.required, fuelValidator()]),
    color: new FormControl("",[ Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]),
    image: new FormControl("",[  Validators.required, Validators.pattern(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)]),
    description: new FormControl("",[ Validators.required, Validators.minLength(5)]),
  })

  constructor(private api: ApiService, private userService: UserService, private router: Router){

  }

  onAnimationEnd(data:boolean){
    if(data){
      this.errorContainer = [];
      return;
    }
  }
  submit(){

    this.errorContainer = errorHandlerValidator(this.form);
    if (this.errorContainer?.length! >  0){
      return;
    } 

    let data: Cars = {
      "_ownerId" : this.userService.user?._id!,
      "year": Number(this.form.get('year')?.value!),
      "carBrand" :this.form.get('brand')?.value?.trim()!,
      "carModel" :this.form.get('model')?.value?.trim()!,
      "engineCapacity" : Number(this.form.get('capacity')?.value),
      "likes" : []!,
      "fuelType" :this.form.get('fuel')?.value?.trim()!,
      "horsePower" : Number(this.form.get('power')?.value),
      "color" : this.form.get('color')?.value?.trim()!,
      "description" : this.form.get('description')?.value?.trim()!,
      "imageURL" : this.form.get('image')?.value?.trim()!,
    }
    this.api.createCar(data).subscribe({
      next: (item) => {
        this.router.navigate(['/catalog'])
      },
      error: (err) => {
        this.errorContainer.push(err);
      }
    })
    
    
  }
}

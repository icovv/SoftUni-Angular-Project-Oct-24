import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { errorHandlerValidator } from '../utils/errorHandler';
import { fuelValidator } from '../utils/fuel.validator';
import { yearValidator } from '../utils/year.validator';
import { ErrorsComponent } from '../core/errors/errors.component';
import { Cars } from '../types/cars';
import { UserService } from '../services/user.service';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderComponent } from '../core/loader/loader.component';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [ReactiveFormsModule, ErrorsComponent, LoaderComponent],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit {
  errorContainer:string[] | null = [];
  likes: string[] = [];
  loading:boolean = true;
  form = new FormGroup({
    brand: new FormControl('',[Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]),
    year: new FormControl(0,[Validators.required, Validators.pattern(/\d+/), yearValidator()]),
    model: new FormControl('',[Validators.required]),
    capacity: new FormControl(0,[Validators.required, Validators.pattern(/\d+/), Validators.min(0)]),
    power: new FormControl(0,[Validators.required, Validators.pattern(/\d+/), Validators.min(0)]),
    fuel: new FormControl('',[ Validators.required, fuelValidator()]),
    color: new FormControl('',[ Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]),
    image: new FormControl('',[  Validators.required, Validators.pattern(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)]),
    description: new FormControl('',[ Validators.required, Validators.minLength(5)]),
  })


  constructor(private userService: UserService, private api: ApiService, private activatedRoute: ActivatedRoute, private router: Router){

  }

  ngOnInit(): void {
    let carID = this.activatedRoute.snapshot.params?.['carId'];
    this.api.getSingleCar(carID).subscribe({
      next: (data) => {
        this.form.get('brand')?.setValue(data.carBrand);
        this.form.get('year')?.setValue(data.year);
        this.form.get('model')?.setValue(data.carModel);
        this.form.get('capacity')?.setValue(data.engineCapacity);
        this.form.get('power')?.setValue(data.horsePower);
        this.form.get('fuel')?.setValue(data.fuelType);
        this.form.get('color')?.setValue(data.color);
        this.form.get('image')?.setValue(data.imageURL);
        this.form.get('description')?.setValue(data.description);
        this.likes = data.likes;
        this.loading = false;
      },
      error: (err) => {
        this.loading = true;
        this.errorContainer?.push(err)
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

    this.errorContainer = errorHandlerValidator(this.form);
    if(this.errorContainer.length > 0) {
      return;
    }

    let carID = this.activatedRoute.snapshot.params?.['carId'];
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

    this.api.editCar(carID,data).subscribe({
      next: (data) =>{ 
        this.router.navigate([`/catalog/${carID}`])
      },
      error: (err) => {
        this.errorContainer?.push('')
        this.router.navigate([`/catalog/${carID}`])
      }
    })
  }
}

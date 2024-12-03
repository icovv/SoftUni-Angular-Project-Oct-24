import { Component, model } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { errorHandlerValidator } from '../utils/errorHandler';
import { fuelValidator } from '../utils/fuel.validator';
import { yearValidator } from '../utils/year.validator';

@Component({
  selector: 'app-list-your-car',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './list-your-car.component.html',
  styleUrl: './list-your-car.component.css'
})
export class ListYourCarComponent {
  errorsContainer:string[] | null = [];
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

  submit(){

    this.errorsContainer = errorHandlerValidator(this.form);
    console.log(this.errorsContainer)
    this.errorsContainer = [];
  }
}

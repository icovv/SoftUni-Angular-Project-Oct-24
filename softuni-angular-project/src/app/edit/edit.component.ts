import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { errorHandlerValidator } from '../utils/errorHandler';
import { fuelValidator } from '../utils/fuel.validator';
import { yearValidator } from '../utils/year.validator';
import { ErrorsComponent } from '../core/errors/errors.component';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [ReactiveFormsModule, ErrorsComponent],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  errorContainer:string[] | null = [];
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
  onAnimationEnd(data:boolean){
    if(data){
      this.errorContainer = [];
      return;
    }
  }
  submit(){

    this.errorContainer = errorHandlerValidator(this.form);
    console.log(this.errorContainer)
  }
}

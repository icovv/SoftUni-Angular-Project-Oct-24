import { Component, model } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-your-car',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './list-your-car.component.html',
  styleUrl: './list-your-car.component.css'
})
export class ListYourCarComponent {
  form = new FormGroup({
    brand: new FormControl("",[Validators.required]),
    year: new FormControl("",[Validators.required]),
    model: new FormControl("",[Validators.required]),
    capacity: new FormControl("",[Validators.required]),
    power: new FormControl("",[Validators.required]),
    fuel: new FormControl("",[Validators.required]),
    color: new FormControl("",[Validators.required]),
    image: new FormControl("",[Validators.required]),
    description: new FormControl("",[Validators.required]),
  })

  submit(){

    
  }
}

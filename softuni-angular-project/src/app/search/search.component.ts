import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { searchValidator } from '../utils/search.validator';
import { ErrorsComponent } from '../core/errors/errors.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, ErrorsComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  errorContainer:string[] = [];
  form = new FormGroup({
    search: new FormControl('',[]),
    dropdown: new FormControl('',[Validators.required])
  },{
    validators:searchValidator()
  })

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

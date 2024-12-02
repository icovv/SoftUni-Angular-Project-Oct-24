import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { emailValidator } from '../../utils/emailValidator.validator';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  errorContainer:string[] = [];
form = new FormGroup({
  email: new FormControl('', [Validators.required, emailValidator()]),
  password: new FormControl('', [Validators.required, Validators.minLength(4)])
})

onAnimationEnd(): void{
  this.errorContainer = [];
  return;
}

login(){
  if(this.form.get('email')?.errors?.['emailValidator']){
    this.errorContainer.push(this.form.get('email')?.errors?.['emailValidator']);
  }
  if(this.form.get('password')?.errors?.['required']){
    this.errorContainer.push("Your password is required!");
  }
  if (this.form.get('password')?.errors?.['minlength']){
    this.errorContainer.push("Please make sure that your password is at least 4 characters long!");
  }

  if(this.errorContainer.length > 0){
    this.form.get('password')?.reset();
    return;
  }

}

}

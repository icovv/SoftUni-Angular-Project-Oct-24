import { Component, ErrorHandler } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { emailValidator } from '../../utils/emailValidator.validator';
import { ErrorsComponent } from '../../core/errors/errors.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, ErrorsComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  errorContainer:string[] = [];
form = new FormGroup({
  email: new FormControl('', [Validators.required, emailValidator()]),
  password: new FormControl('', [Validators.required, Validators.minLength(4)])
})

onAnimationEnd(data:boolean): void{
  if(data == true){
    this.errorContainer = [];
    return;
  }
}
  constructor(private userService: UserService, private router: Router){

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

  let email:string = this.form.get('email')?.value!;
  let password:string | number = this.form.get('password')?.value!;

  this.userService.login(email,password).subscribe({
    next: (data) => {
       this.router.navigate(['/catalog']);
       localStorage.setItem('userData',JSON.stringify(data))
      }, 
    error:(err) => this.errorContainer.push(err)})

}

}

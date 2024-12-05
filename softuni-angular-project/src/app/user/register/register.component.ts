import { Component,} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { passwordValidator } from '../../utils/password.validator';
import { emailValidator } from '../../utils/emailValidator.validator';
import { ErrorsComponent } from '../../core/errors/errors.component';
import { UserService } from '../../services/user.service';
import { registerErrorHandler } from '../../utils/registerErrorHandler';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, ErrorsComponent ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent{
  errorContainer:string[]= [];
  form = new FormGroup({
    email: new FormControl('',[Validators.required, emailValidator()]),
    passGroup: new FormGroup({
      password: new FormControl('',[Validators.required, Validators.minLength(4)]),
      repass: new FormControl('',[Validators.required, Validators.minLength(4)]),
    },{
      validators:[passwordValidator()]
    })

  })

  onAnimationEnd(data:boolean): void{
    if(data == true){
      this.errorContainer = [];
      return
    }
  }
  constructor(private userService: UserService, private router: Router){

  }
  register(){
    
    this.errorContainer = registerErrorHandler(this.form);
    if (this.errorContainer.length > 0) {
      return;
    }
    let email:string = this.form.get('email')?.value!;
    let password:string | number = this.form.get('passGroup')?.get('password')?.value!;

    this.userService.register(email.trim(),password.trim()).subscribe({
      next: (data) => {
        this.router.navigate(['/catalog']);
        localStorage.setItem('userData',JSON.stringify(data))
      },
      error: (error) => {
        this.errorContainer.push(error)
      }
    });
    
    
  }

}

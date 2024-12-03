import { Component,} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { passwordValidator } from '../../utils/password.validator';
import { emailValidator } from '../../utils/emailValidator.validator';
import { ErrorsComponent } from '../../core/errors/errors.component';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, ErrorsComponent ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent{
  errorContainer:string[] = [];
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
  register(){
    if(this.form.get('email')?.errors?.['emailValidator']){
      this.errorContainer.push(this.form.get('email')?.errors?.['emailValidator']);
    }

    if(this.form.get('passGroup')?.errors?.['passwordValidator']){
      this.errorContainer.push(this.form.get('passGroup')?.errors?.['passwordValidator']);
    }

    if(this.form.get('passGroup')?.get('password')?.errors?.['required'] || this.form.get('passGroup')?.get('password')?.errors?.['required']){
      this.errorContainer.push("Both passwords are required!");
    }

    if(this.form.get('passGroup')?.get('password')?.errors?.['minlength'] || this.form.get('passGroup')?.get('password')?.errors?.['minlength']){
      this.errorContainer.push("Please make sure that both passwords are at least 4 characters long!");
    }
    
    if(this.errorContainer.length > 0){
      this.form.get('passGroup')?.get('password')?.reset();
      this.form.get('passGroup')?.get('repass')?.reset();
      return;
    }
    console.log(this.form.get('passGroup'))
  }

}

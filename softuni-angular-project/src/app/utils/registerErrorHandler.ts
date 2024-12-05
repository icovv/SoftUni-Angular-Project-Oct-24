import { FormGroup } from "@angular/forms";

export function registerErrorHandler(form:FormGroup){
  let email = form.get('email');
  let password = form.get('passGroup')?.get('password');
  let repass = form.get('passGroup')?.get('repass')
    let errorContainer:string[] = []
      if (email?.errors?.['required'] || password?.errors?.['required'] || repass?.errors?.['required']){
      errorContainer.push("All fields are required!");
      password?.reset();
      repass?.reset();
      return errorContainer
      }
      if (email && (email?.value.trim() == "") || password && (password?.value.trim() == "") || repass && (repass?.value.trim() == "")){
      errorContainer.push("All fields are required!");
      password?.reset();
      repass?.reset();
      return errorContainer
      }
      if(email?.errors?.['emailValidator']){
        errorContainer.push(email?.errors?.['emailValidator']);
      }
  
      if(form.get('passGroup')?.errors?.['passwordValidator']){
        errorContainer.push(form.get('passGroup')?.errors?.['passwordValidator']);
      }

      if(password?.errors?.['minlength'] || password?.errors?.['minlength'] || password && (password?.value.trim().length < 4) || repass && (repass?.value.trim().length < 4)){
        errorContainer.push("Please make sure that both passwords are at least 4 characters long!");
      }
      
      if(errorContainer.length > 0){
        password?.reset();
        repass?.reset();
        return errorContainer;
      }

      return []
}
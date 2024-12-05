import { FormGroup } from "@angular/forms";

export function loginErrorHandler(form:FormGroup){
  let email = form.get('email');
  let password = form.get('password');
    let errorContainer:string[] = []

    if (email && (email?.value.trim() == "") || password && (password?.value.trim() == "")){
        errorContainer.push("All fields are required!");
        password?.reset();
        return errorContainer
        }
    
    if(email?.errors?.['emailValidator']){
        errorContainer.push(email?.errors?.['emailValidator']);
    }
    if(password?.errors?.['required'] || password && (password.value.trim())){
        errorContainer.push("Your password is required!");
    }
    if (password?.errors?.['minlength'] || password && (password.value.trim().length < 4)){
        errorContainer.push("Please make sure that your password is at least 4 characters long!");
    }
    
    if(errorContainer.length > 0){
        password?.reset();
        return errorContainer;
    }

      return []
}
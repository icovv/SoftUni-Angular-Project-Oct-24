import { FormGroup } from "@angular/forms";

export function registerErrorHandler(form:FormGroup){
    let errorContainer:string[] = []
    if(form.get('email')?.errors?.['emailValidator']){
        errorContainer.push(form.get('email')?.errors?.['emailValidator']);
      }
  
      if(form.get('passGroup')?.errors?.['passwordValidator']){
        errorContainer.push(form.get('passGroup')?.errors?.['passwordValidator']);
      }
  
      if(form.get('passGroup')?.get('password')?.errors?.['required'] || form.get('passGroup')?.get('password')?.errors?.['required']){
        errorContainer.push("Both passwords are required!");
      }
  
      if(form.get('passGroup')?.get('password')?.errors?.['minlength'] || form.get('passGroup')?.get('password')?.errors?.['minlength']){
        errorContainer.push("Please make sure that both passwords are at least 4 characters long!");
      }
      
      if(errorContainer.length > 0){
        form.get('passGroup')?.get('password')?.reset();
        form.get('passGroup')?.get('repass')?.reset();
        return errorContainer;
      }

      return null
}
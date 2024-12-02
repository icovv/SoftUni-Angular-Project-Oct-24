import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function passwordValidator(
):ValidatorFn{
    return (control: AbstractControl): ValidationErrors | null => {
        let password = control.get('password')?.value;
        let repass = control.get('repass')?.value
        if(password != repass){
          return {passwordValidator : "Please make sure that both passwords match!"}
        }
        return null;
      };
}
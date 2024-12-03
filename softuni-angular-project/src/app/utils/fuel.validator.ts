import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function fuelValidator():ValidatorFn{
    return(control: AbstractControl): ValidationErrors | null =>{
        let fuel = control.value.trim();
        if(!(fuel == 'Diesel' || fuel == `Petrol`)){
            return {"isInvalid" : "Please make sure to provide a fuel type from the listed ones!"}
        }
        return null
    }
}
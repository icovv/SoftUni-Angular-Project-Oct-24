import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function yearValidator():ValidatorFn{
    return(control: AbstractControl): ValidationErrors | null =>{
        let year:number = control.value;
        if (year < 1886 ){
            return {"isInvalid" : "Please make sure to provide valid year of the vehicle! (Oldest created car was in 1886)" }
        }   
        if(year > 2025){
            return {"isInvalid" : "Please make sure to provide valid year of the vehicle! (We cannot accept concept cars)" }
        }
        return null
    }
}
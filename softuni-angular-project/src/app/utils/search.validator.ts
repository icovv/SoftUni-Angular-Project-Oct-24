import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from "@angular/forms";
export function searchValidator():ValidatorFn{

    return(control: AbstractControl): ValidationErrors | null =>{
        let search: string | number= control.get('search')?.value;
        let dropdown = control.get('dropdown')?.value;
        if (dropdown == ``){
            return {"isInvalid" : "Please select search criteria!"};
        }
        if (!Number(search) && dropdown == `horsePowerLess`){
            return {"isInvalid" : "Please provide valid horse power!"};
        }
        if (!Number(search) && dropdown == `horsePowerMore`){
            return {"isInvalid" : "Please provide valid horse power!"};
        }
        if (Number(search) && dropdown == `carModel`){
            return {"isInvalid" : "Please provide valid car model!"};
        }
        if (Number(search) && dropdown == `carBrand`){
            return {"isInvalid" : "Please provide valid car model!"};
        }
        return null
    }
}
import { FormControl, FormGroup, NgForm } from "@angular/forms";

export function errorHandlerValidator(form: FormGroup):string[] | null{
    let errors = [];
    let brandErrors = form.get('brand')?.errors;
    let yearErrors = form.get('year')?.errors;
    let modelErrors = form.get('model')?.errors;
    let capacityErrors = form.get('capacity')?.errors;
    let powerErrors = form.get('power')?.errors;
    let fuelErrors = form.get('fuel')?.errors;
    let colorErrors = form.get('color')?.errors;
    let imageErrors = form.get('image')?.errors;
    let descriptionErrors = form.get('description')?.errors;
    
    if(brandErrors?.['required'] || yearErrors?.['required'] || modelErrors?.['required'] || capacityErrors?.['required'] || powerErrors?.['required'] || fuelErrors?.['required'] || colorErrors?.['required'] || imageErrors?.['required'] || descriptionErrors?.['required']){
        errors.push("All fields are required!");
        return errors;
    }
    if(brandErrors?.['pattern']){
        errors.push("Please make sure to provide a valid brand name!")
    }

    if(yearErrors?.['pattern']){
        errors.push("Please provide valid year!")
    }
    if(yearErrors?.['isInvalid']){
        errors.push(yearErrors?.['isInvalid'])
    }

    if(capacityErrors?.['pattern']){
        errors.push("Please provide valid capacity!")
    }
    if(capacityErrors?.['min']){
        errors.push("Please make sure to provide a valid engine capacity!")
    }

    if(powerErrors?.['pattern']){
        errors.push("Please provide valid horse power!")
    }

    if(powerErrors?.['min']){
        errors.push("Please make sure to provide a valid horse power!")
    }

    if(colorErrors?.['pattern']){
        errors.push("Please make sure to provide a valid color!")
    }

    if(fuelErrors?.['isInvalid']){
        errors.push(fuelErrors?.['isInvalid'])
    }

    if(imageErrors?.['pattern']){
        errors.push("Please make sure to provide a valid url!")
    }

    if(descriptionErrors?.['minlength']){
        errors.push("The description is too short!")
    }
    console.log(errors);
    if(errors.length > 0){
        return errors;
    }
    return null;
}
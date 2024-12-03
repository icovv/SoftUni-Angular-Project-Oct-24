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
        errors.push("Please make sure to provide a valid brand name!");
        form.get('brand')?.setValue(``);
    }

    if(yearErrors?.['pattern']){
        errors.push("Please provide valid year!");
        form.get('year')?.setValue(``);
    }
    if(yearErrors?.['isInvalid']){
        errors.push(yearErrors?.['isInvalid']);
        form.get('year')?.setValue(``);
    }

    if(capacityErrors?.['pattern']){
        errors.push("Please provide valid capacity!");
        form.get('capacity')?.setValue(``);
    }
    if(capacityErrors?.['min']){
        errors.push("Please make sure to provide a valid engine capacity!");
        form.get('capacity')?.setValue(``);
    }

    if(powerErrors?.['pattern']){
        errors.push("Please provide valid horse power!");
        form.get('power')?.setValue(``);
    }

    if(powerErrors?.['min']){
        errors.push("Please make sure to provide a valid horse power!");
        form.get('power')?.setValue(``);
    }

    if(colorErrors?.['pattern']){
        errors.push("Please make sure to provide a valid color!");
        form.get('color')?.setValue(``);
    }

    if(fuelErrors?.['isInvalid']){
        errors.push(fuelErrors?.['isInvalid']);
        form.get('fuel')?.setValue(``);
    }

    if(imageErrors?.['pattern']){
        errors.push("Please make sure to provide a valid url!");
        form.get('image')?.setValue(``);
    }

    if(descriptionErrors?.['minlength']){
        errors.push("The description is too short!");
        form.get('description')?.setValue(``);
    }
    if(errors.length > 0){
        return errors;
    }
    return null;
}
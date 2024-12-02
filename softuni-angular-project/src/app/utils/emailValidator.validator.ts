import { ValidatorFn } from "@angular/forms";

export function emailValidator():ValidatorFn{
    let pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    return (control) => {
        let isInvalid = control.value === `` || !pattern.test(control.value)
        return isInvalid ? {emailValidator:"You have to type a valid email!"} : null
    }
}
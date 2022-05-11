import { AbstractControl } from '@angular/forms';

export class CustomValidation {
    static number(control: AbstractControl): { [key: string]: any } | null {
        const pattern = /^[1-9][0-9]*$/;
        if (control.value && !pattern.test(control.value)) {
            return { 'numberInvalid': true };
        }
        return null;
    }
}
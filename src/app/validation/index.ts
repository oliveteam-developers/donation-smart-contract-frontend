import { AbstractControl } from '@angular/forms';

export class CustomValidation {
    static number(control: AbstractControl): { [key: string]: any } | null {
        const pattern = /^[0-9][0-9]*$/;
        if (control.value && !pattern.test(control.value)) {
            return { 'numberInvalid': true };
        }
        return null;
    }

    static string(control: AbstractControl): { [key: string]: any } | null {
        if (control.value && control.value.trim() === '') {
            return { 'stringInvalid': true };
        }
        return null;
    }
}
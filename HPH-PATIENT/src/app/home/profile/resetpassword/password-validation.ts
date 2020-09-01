// import { AbstractControl } from '@angular/forms';
// export class PasswordValidation {
//     static MatchPassword(AC: AbstractControl) {
//         let password = AC.get('password').value;
//         if (AC.get('confirmPassword').touched || AC.get('confirmPassword').dirty) {
//             let verifyPassword = AC.get('confirmPassword').value;

//             if (password != verifyPassword) {
//                 AC.get('confirmPassword').setErrors({ MatchPassword: true })
//             } else {
//                 return null
//             }
//         }
//     }
// }
import { FormGroup } from '@angular/forms';

// custom validator to check that two fields match
export function MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}

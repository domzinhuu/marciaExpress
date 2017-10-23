import { FormControl } from '@angular/forms';
export class SyncValidator{

    static passwordMatch(formControl:FormControl):any{
        const formGroup = formControl.parent

        if(formGroup && formGroup.get('password') && formGroup.get('confirmation')){
            if(!(formGroup.get('password').value === formGroup.get('confirmation').value))
            return {"passwordMismatch":true}
        }

        return null
    }
}
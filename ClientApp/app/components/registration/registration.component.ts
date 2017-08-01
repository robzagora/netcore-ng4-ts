
import { Component } from '@angular/core';
import { Response } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

import { Navigatable } from './../../library/routing/navigatable';
import { ProgressService } from './../../services/progress.service';
import { AuthService } from './../../services/auth.service';

import { RegistrationModel } from './../../library/auth/registration-model';
import { easeIn } from './../../library/visualisation/animations';

@Component({
    selector: 'registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.min.css'],
    animations: [easeIn]
})
export class RegistrationComponent extends Navigatable {

    private registering: boolean = false;
    private registrationForm: FormGroup;

    constructor(progressService: ProgressService, private formBuilder: FormBuilder, private authService: AuthService) {
        super(progressService); 

        this.registrationForm = formBuilder.group({
            'email': [null, [Validators.required, Validators.email]],
            'name': [null, [Validators.required, Validators.minLength(6)]], // TODO: add custom validator for proper name/surname registration e.g. to not allow special characters for name/surname
            'surname': [null, [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
            'username': [null, [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
            'password': [null, [Validators.required, Validators.minLength(6)]]
        });
    }

    ngOnInit() {
        this.workFinished();
    }

    ngOnDestroy() {
        this.finaliseComponent();

        this.workOngoing();
    }

    performRegistration() {

        this.registrationForm.disable();
        this.registering = true;

        let data = this.registrationForm.value;

        this.authService
            .register(new RegistrationModel(
                data.name,
                data.surname,
                data.username,
                data.email,
                data.password
            ))
            .catch(this.handleRegistrationError)
            .map((response: Response) => {
                this.registering = false;
                this.registrationForm.enable();
            })
            .subscribe();
    }

    private handleRegistrationError(error: Response) {
        this.registering = false;
        this.registrationForm.enable();

        return Observable.throw(error.text);
    }
}
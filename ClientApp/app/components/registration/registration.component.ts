
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Navigatable } from './../../library/routing/navigatable';
import { ProgressService } from './../../services/progress.service';
import { NavService } from './../../services/nav.service';

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

    constructor(private formBuilder: FormBuilder, progressService: ProgressService) {
        super(progressService); 

        this.registrationForm = formBuilder.group({
            'email': [null, Validators.required, Validators.email],
            'username': [null, Validators.required], //Validators.minLength(6)], 
            'password': [null, Validators.required], //Validators.minLength(6)],
        })
    }

    ngOnInit() {
        this.workFinished();
    }

    ngOnDestroy() {
        this.finaliseComponent();

        this.workOngoing();
    }

    performRegistration() {
        // TODO: hookup with authservice
        this.registrationForm.disable();
        this.registering = true;
    }
}
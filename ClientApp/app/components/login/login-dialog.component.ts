import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdDialogRef } from '@angular/material';

import { Subscription } from 'rxjs/Subscription';

import { LoginUser } from './../../library/auth/login-user';
import { AuthService } from './../../services/auth.service';

@Component({
    selector: 'login-dialog',
    templateUrl: './login-dialog.component.html'
})
export class LoginDialogComponent {

    private logginSubscription: Subscription;

    // The FormGroup object as you may remember from the simple form example exposes various API’s for dealing with forms. Here we are creating a new object and setting its type to FormGroup
    userForm: FormGroup;

    constructor(private formBuild: FormBuilder, private authService: AuthService, public dialogRef: MdDialogRef<LoginDialogComponent>) {

        this.userForm = formBuild.group({
            // We can set default values by passing in the corresponding value or leave blank if we wish to not set the value. For our example, we’ll default the gender to female.
            'username': [null, Validators.required],
            'password': [null, Validators.required],
        })
    }

    ngOnInit() {
        this.authService.loggedInObservable.subscribe(loggedIn => {
            if (loggedIn) {
                this.dialogRef.close();
            }
        });
    }

    performLogin(value: any) {
        console.log(value);

        this.authService.login(new LoginUser(value.username, value.password));
    }
}
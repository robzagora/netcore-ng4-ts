import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdDialogRef } from '@angular/material';

import { Subscription } from 'rxjs/Subscription';

import { LoginUser } from './../../library/auth/login-user';
import { AuthService } from './../../services/auth.service';
import { NavService } from './../../services/nav.service';

@Component({
    selector: 'login-dialog',
    templateUrl: './login-dialog.component.html',
    styleUrls: ['./login-dialog.component.min.css']
})
export class LoginDialogComponent {

    private loggedInSubscription: Subscription;
    private loginOngoingSubscription: Subscription;

    private loginOngoing: boolean;

    private loginForm: FormGroup;

    constructor(private formBuilder: FormBuilder, private authService: AuthService, private navService: NavService, public dialogRef: MdDialogRef<LoginDialogComponent>) {

        this.loginForm = formBuilder.group({
            'username': [null, Validators.required],
            'password': [null, Validators.required],
        })
    }

    ngOnInit() {
        this.loginOngoingSubscription = this.authService.loginOngoingObservable.subscribe(loginOngoing => {
            loginOngoing ? this.loginForm.disable() : this.loginForm.enable();
            this.loginOngoing = loginOngoing;
        });
        this.loggedInSubscription = this.authService.loggedInObservable.subscribe(loggedIn => {
            if (loggedIn) {
                this.dialogRef.close();
            }
        });
    }

    ngOnDestroy() {
        this.loggedInSubscription.unsubscribe();
    }

    performLogin(value: any) {
        this.authService.login(new LoginUser(value.username, value.password));
    }

    goToRegistration() {
        this.dialogRef.close();
        this.navService.goToRegistration();
    }
}
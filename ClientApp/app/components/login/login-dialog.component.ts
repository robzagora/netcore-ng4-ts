import { Component } from '@angular/core';
import { LoginUser } from './../../library/auth/login-user';

@Component({
    selector: 'login-dialog',
    templateUrl: './login-dialog.component.html'
})
export class LoginDialogComponent {

    private user: LoginUser;

    constructor() {
        this.user = new LoginUser();
    }
}
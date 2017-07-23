import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable()
export class AuthService implements CanActivate {

    private isLoggedIn: boolean = false;

    constructor() {

    }

    canActivate() {
        console.log(AuthService.name + '#canActivate called');
        return true;
    }
}
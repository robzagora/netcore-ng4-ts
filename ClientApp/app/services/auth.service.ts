import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { CanActivate } from '@angular/router';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { LoginUser } from './../library/auth/login-user';
import { HttpServiceBase } from './../library/http/http-service-base';

@Injectable()
export class AuthService extends HttpServiceBase implements CanActivate {

    // Observable item source
    private loggedInState = new BehaviorSubject<boolean>(false);
    private loginOngoing = new BehaviorSubject<boolean>(false);

    // Observable item stream
    loggedInObservable = this.loggedInState.asObservable();
    loginOngoingObservable = this.loginOngoing.asObservable();

    private headers: Headers;
    private putRequestOptions: RequestOptions;

    constructor(http: Http) {
        super(http);

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');

        this.putRequestOptions = new RequestOptions({ headers: this.headers });
    }

    canActivate() {
        console.log(AuthService.name + '#canActivate called');
        return true;
    }

    login(credentials: LoginUser) {

        if (!this.loggedInState.value) {

            this.loginOngoing.next(true);

            let body = JSON.stringify({ Username: credentials.getUsername(), Password: credentials.getPassword() });

            this.put('/api/auth/login', body, this.putRequestOptions)
                .map((response: Response) => {

                    this.loginOngoing.next(false);

                    console.log(response.statusText);

                    if (response.status == 200) {
                        this.loggedInState.next(true);
                    }
                })
                .subscribe();
        }
    }

    logout() {

        if (this.loggedInState.value) {

            this.put('/api/auth/logout')
                .map((response: Response) => {

                    console.log(response.statusText);

                    if (response.status == 200) {
                        this.loggedInState.next(false);
                    }
                })
                .subscribe();
        }
    }
}
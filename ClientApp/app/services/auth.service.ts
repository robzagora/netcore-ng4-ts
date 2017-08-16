import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { LoginUser } from './../library/auth/login-user';
import { RegistrationModel } from './../library/auth/registration-model';
import { HttpServiceBase } from './../library/http/http-service-base';

@Injectable()
export class AuthService extends HttpServiceBase {

    // Observable item source
    private loggedInState = new BehaviorSubject<boolean>(false);
    private loginOngoing = new BehaviorSubject<boolean>(false);

    // Observable item stream
    loggedInObservable = this.loggedInState.asObservable();
    loginOngoingObservable = this.loginOngoing.asObservable();

    private putRequestOptions: RequestOptions;
    private postRequestOptions: RequestOptions;

    private user: string = '';

    constructor(http: Http) {
        super(http);

        let putHeader = new Headers();
        putHeader.append('Content-Type', 'application/json');
        this.putRequestOptions = new RequestOptions({ headers: putHeader });

        let postHeader = new Headers();
        postHeader.append('Content-Type', 'application/x-www-form-urlencoded');
        this.postRequestOptions = new RequestOptions({ headers: postHeader });
    }

    isLoggedIn() {
        return this.loggedInState.value;
    }

    getLoggedInUser() {
        return this.user;
    }

    register(data: RegistrationModel): Observable<Response> {

        let body = JSON.stringify({
            Name: data.getName(),
            Surname: data.getSurname(),
            Email: data.getEmail(),
            Username: data.getUsername(),
            Password: data.getPassword()
        });

        return this.put('/api/auth/register', body, this.putRequestOptions);
    }

    login(credentials: LoginUser) {

        if (!this.loggedInState.value) {

            this.loginOngoing.next(true);

            let body = JSON.stringify({ Username: credentials.getUsername(), Password: credentials.getPassword() });

            return this.put('/api/auth/login', body, this.putRequestOptions)
                .catch(this.handleLoginError.bind(this)) // if we don't do the .bind(this) then in our function the "this" keyword won't the "this components" scope and would be it's own functions scope instead
                // Ways to accomplish the same thing
                //.catch((error: Response) => this.handleLoginError(error)) 
                //.catch((error: Response) => {
                //    this.loginOngoing.next(false); return Observable.throw(error.text);
                //})
                .map((response: Response) => {

                    this.loginOngoing.next(false);

                    if (response.status == 200) {
                        this.loggedInState.next(true);
                        this.user = credentials.getUsername();
                    }

                    return response;
                })
        }

        return Observable.empty<Response>();
    }

    logout() {

        if (this.loggedInState.value) {

            this.put('/api/auth/logout')
                .map((response: Response) => {

                    if (response.status == 200) {
                        this.loggedInState.next(false);
                        this.user = '';
                    }
                })
                .subscribe();
        }
    }

    private handleLoginError(error: Response) {

        console.log(error);

        this.loginOngoing.next(false);

        return Observable.throw(error.text);
    }
}
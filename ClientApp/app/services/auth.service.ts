import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { AuthState, AuthResponse, AuthData } from './../library/auth/server-interfaces';
import { LoginUser } from './../library/auth/login-user';
import { RegistrationModel } from './../library/auth/registration-model';
import { HttpServiceBase } from './../library/http/http-service-base';

@Injectable()
export class AuthService extends HttpServiceBase {

    private static LocalStorageUserKey: string = "user";
    private static LocalStorageTokenKey: string = "token";
    private static LocalStorageRequestTimeKey: string = "tokenRequestedAt";

    // Observable item source
    private loggedInState = new BehaviorSubject<boolean>(false);
    private loginOngoing = new BehaviorSubject<boolean>(false);

    // Observable item stream
    loggedInObservable = this.loggedInState.asObservable();
    loginOngoingObservable = this.loginOngoing.asObservable();

    private putRequestOptions: RequestOptions;
    private postRequestOptions: RequestOptions;

    constructor(http: Http) {
        super(http);

        let putHeader = new Headers();
        putHeader.append('Content-Type', 'application/json');
        this.putRequestOptions = new RequestOptions({ headers: putHeader });

        let postHeader = new Headers();
        postHeader.append('Content-Type', 'application/x-www-form-urlencoded');
        this.postRequestOptions = new RequestOptions({ headers: postHeader });

        this.loggedInState.next(this.isLoggedIn());
    }
    
    isLoggedIn() {

        let user = localStorage.getItem(AuthService.LocalStorageUserKey);

        return user != undefined;
    }

    getLoggedInUser() {
        let user = localStorage.getItem(AuthService.LocalStorageUserKey);

        return user;
    }

    getUserToken() {
        return localStorage.getItem(AuthService.LocalStorageTokenKey);
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

        // TODO: check sessionStorage of token item
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

                    let authResponse = response.json() as AuthResponse;
                    if (authResponse.state == AuthState.Success)
                    {
                        localStorage.setItem(AuthService.LocalStorageUserKey, credentials.getUsername());
                        localStorage.setItem(AuthService.LocalStorageTokenKey, authResponse.data.accessToken);
                        localStorage.setItem(AuthService.LocalStorageRequestTimeKey, authResponse.data.requestTimestamp.toString());

                        this.loggedInState.next(true);
                    }

                    return response;
                })
        }

        return Observable.empty<Response>();
    }

    logout() {

        // TODO: check if sessionStorage contains token item
        if (this.loggedInState.value) {

            // TODO: clear localstorage for token variable

            this.put('/api/auth/logout')
                .map((response: Response) => {

                    if (response.status == 200) {

                        localStorage.removeItem(AuthService.LocalStorageUserKey);
                        localStorage.removeItem(AuthService.LocalStorageTokenKey);
                        localStorage.removeItem(AuthService.LocalStorageRequestTimeKey);

                        this.loggedInState.next(false);
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
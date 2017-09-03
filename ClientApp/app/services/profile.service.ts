
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { AuthService } from './auth.service';
import { HttpServiceBase } from './../library/http/http-service-base';

@Injectable()
export class ProfileService extends HttpServiceBase  {
    constructor(private authService: AuthService, http: Http) {
        super(http);
    }

    getProfile() {
        return this.get('/api/profile/get', { headers: this.generateBearerHeaders() });
    }

    // Test calls to prove bearer authorization works
    getProfileNoHeader() {
        return this.get('/api/profile/get');
    }

    getProfileRandomBearer() {

        let headers = new Headers();
        headers.append("Authorization", "Bearer " + this.authService.getUserToken() + "asa");

        return this.get('/api/profile/get', { headers: headers });
    }
    //

    private generateBearerHeaders(): Headers {
        var headers = new Headers();
        headers.append("Authorization", "Bearer " + this.authService.getUserToken());

        return headers;
    }
}
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/Rx';

import { AuthService } from './auth.service';

import { Stock } from './../library/visualisation/models';

import { HttpServiceBase } from './../library/http/http-service-base';

@Injectable()
export class VisualisationService extends HttpServiceBase {

    constructor(http: Http) {
        super(http);
    }

    getStocks(): Observable<Stock[]> { 

        return this.get('/api/visualisation/getstocks')
            .map((response: Response) => {

                let json = response.json() as Array<any>;

                return json.map(r => {
                    return { date: new Date(r.date), value: r.value } as Stock;
                })
            });
    }
}
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Stock } from './../library/visualisation/temp-data';

import 'rxjs/Rx';

@Injectable()
export class VisualisationService {

    constructor(private http: Http) {
    }

    getStocks(): Observable<Stock[]> {

        return this.http
            .get('/api/visualisation/getstocks')
            .map((response: Response) => {

                let json = response.json() as Array<any>;

                let stocks = json.map(r =>
                {
                    return { date: new Date(r.date), value: r.value } as Stock;
                })

                return stocks;
            })
            .catch(this.handleError);
    }

    // TODO: create a Service base class to handle errorful responses
    private handleError(error: Response) {
        console.error(error);
        let msg = `Error status code ${error.status} at ${error.url}`;

        return Observable.throw(msg);
    }
}
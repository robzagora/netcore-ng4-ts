import { Injectable, InjectionToken } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/Rx';

export class News {
    constructor(
        public name: string,
        public value: number)
    {
    }
}

@Injectable()
export class NewsService {

    private headers: Headers;
    private putRequestOptions: RequestOptions;

    constructor(private http: Http) {

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');

        this.putRequestOptions = new RequestOptions({ headers: this.headers });
    }

    getNews(): Observable<News[]> {

        return this.http
            .get('/api/news/getall')
            .map((response: Response) => {
                return response.json() as News[];
            })
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        let msg = `Error status code ${error.status} at ${error.url}`;

        return Observable.throw(msg);
    }
}
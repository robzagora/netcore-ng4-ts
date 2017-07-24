import { Injectable, InjectionToken } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/Rx';

import { HttpServiceBase } from './../library/http/http-service-base';

export class News {
    constructor(
        public name: string,
        public value: number)
    {
    }
}

@Injectable()
export class NewsService extends HttpServiceBase {

    private headers: Headers;
    private putRequestOptions: RequestOptions;

    constructor(http: Http) {
        super(http);

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');

        this.putRequestOptions = new RequestOptions({ headers: this.headers });
    } 

    getNews(): Observable<News[]> {

        return this.get('/api/news/getall')
            .map((response: Response) => {
                return response.json() as News[];
            });
    }
}
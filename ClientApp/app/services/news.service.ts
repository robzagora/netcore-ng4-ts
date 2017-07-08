import { Injectable, InjectionToken  } from '@angular/core';
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

    private http: Http;
    private headers: Headers;
    private putRequestOptions: RequestOptions;

    constructor(http: Http) {
        this.http = http;

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');

        this.putRequestOptions = new RequestOptions({ headers: this.headers });
    }

    getNews(): Observable<News[]> {

        // TODO: make this a const 
        // https://github.com/MarkPieszak/aspnetcore-angular2-universal/blob/master/Client/app/shared/user.service.ts
        // let baseUrl = new InjectionToken<string>('ORIGIN_URL').toString();

        let request = "http://localhost:52505/api/news/getall";

        return this.http
            .get(request)
            .map((response: Response) => {
                return <News[]>response.json()
            })
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        let msg = `Error status code ${error.status} at ${error.url}`;

        return Observable.throw(msg);
    }
}
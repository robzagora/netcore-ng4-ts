
import { Http, Response, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';

export abstract class HttpServiceBase
{
    protected http: Http;

    protected constructor(http: Http) {
        this.http = http;
    }

    protected get(url: string): Observable<Response> {
        return this.http.get(url).catch(this.handleError);
    }

    protected put(url: string, body?: any, options?: RequestOptionsArgs): Observable<Response> {

        body = body == undefined ? JSON.stringify({}) : body;

        return this.http.put(url, body, options).catch(this.handleError);
    }

    protected post(url: string, body?: any, options?: RequestOptionsArgs): Observable<Response> {

        body = body == undefined ? JSON.stringify({}) : body;

        return this.http.post(url, body).catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        let msg = `Error status code ${error.status} at ${error.url}`;

        return Observable.throw(msg);
    }
}
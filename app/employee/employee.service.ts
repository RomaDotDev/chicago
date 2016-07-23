import { Component, Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import './rxjs-operators';

import { Employee } from './employee';

@Injectable()
export class EmployeeService {
    constructor(private http: Http){
        console.log('init');
    }

    private API_URL = 'http://localhost:8080';  // URL to web API

    getEmployees (): Observable<Employee[]> {
        return this.http.get(this.API_URL)
                      .map(this.extractData)
                      .catch(this.handleError);
    }

    addEmployees (name: string): Observable<Employee> {
        let body = JSON.stringify({ name });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.API_URL, body, options)
                      .map(this.extractData)
                      .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || { };
    }

    private handleError (error: any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }

}

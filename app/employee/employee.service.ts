// a singleton service shared between for employee components

import { Component, Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import './rxjs-operators';

import { Employee } from './employee';

@Injectable()
export class EmployeeService {
    constructor(private http: Http){}

    private API_URL = 'http://localhost:8080';  // URL to web API

// NOTE: alike phone numbers or dates,
// it's bad idea to keep first and last names combined field

// NOTE: uppercase data also makes no sense since it adds more difficulty in UI,
// I keep it as is since data normalization is not a purpose of this test

// Generally speaking, API should provide an endpoint for departments list,
// defining them on client side is not rational

    getEmployee (id:number): Observable<Employee> {
        return this.http.get(`${this.API_URL}/${id}`)
                      .map(this.extractData)
                      .catch(this.handleError);
    }

    getEmployees (pageNum?:number, perPage?:number): Observable<Employee[]> {
        // both pageNum and perPage params are optional 
        let searchObj:Object = {};
        if (typeof pageNum !== 'undefined'){ searchObj['page'] = pageNum };
        if (typeof perPage !== 'undefined'){ searchObj['per_page'] = perPage };

        let search:string = this.serializeParams(searchObj);
        let options:RequestOptions = new RequestOptions({ search: search });

        return this.http.get(this.API_URL, options)
                      .map(this.extractData)
                      .catch(this.handleError);
    }

// User's Id should not be defined by client,
// it's DB work, there is autoincrement feature for it
    addEmployee (employee: Employee): Observable<Employee> {
        let body:string = JSON.stringify(employee);
        let headers:Headers = new Headers({ 'Content-Type': 'application/json' });
        let options:RequestOptions = new RequestOptions({ headers: headers });

        return this.http.post(this.API_URL, body)
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

    private serializeParams(params:Object) {
         let str:Array<string> = [];
         for (let p in params){
             str.push(encodeURIComponent(p) + '=' + encodeURIComponent(params[p]));
         }
         return str.join('&');
     }

}

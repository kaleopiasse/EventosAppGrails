import {Http, RequestOptions, Headers, Response} from '@angular/http'
import {Injectable, EventEmitter} from '@angular/core'
import {Login} from '../models/login.model'
import {Observable} from 'rxjs/Observable'
import 'rxjs/Rx';

@Injectable()
export class LoginService{

    constructor(private http:Http){}
    /*
    public getLogin(): Observable<Login[]>{
        return this.http.get(`${URL}/login`)
        .map((res: Response) => res.json())
    }
    */
}
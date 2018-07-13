import { Http, RequestOptions, Headers, Response } from '@angular/http'
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'
import {Observable} from 'rxjs/Observable'
import 'rxjs/Rx';

import {Evento} from '../models/evento.model'
import { environment } from 'environments/environment';
import { User } from '../models/user.model';

interface UsersLisRes{
    users : User[]
}

@Injectable()
export class UserService{

    private baseUrl = environment.baseUrl

    constructor (private http:Http, private $http: HttpClient){}

    public getUsers(): Observable<UsersLisRes>{
        return this.$http.get<UsersLisRes>(this.baseUrl+`/user`)
    }

    public getUserByName(termoPesquisa: string): Observable<UsersLisRes>{
        return this.$http.get<UsersLisRes>(this.baseUrl+`/user/`+termoPesquisa)
    }
    /*
    public saveEvento(evento: Evento): Observable<Evento>{
        return this.$http.post<Evento>(this.baseUrl+'/evento/',evento)
    }

    public updateEvento(evento: Evento): Observable<Evento>{
        return this.$http.put<Evento>(this.baseUrl+'/evento/'+evento.id, evento)
    }

    public getEventoById(id: number): Observable<Evento>{
        return this.$http.get<Evento>(this.baseUrl+'/evento/'+id)
    }
    
    public deleteEventoById(id: number): Observable<Evento>{
        return this.$http.delete<Evento>(this.baseUrl+'/evento/'+id)
    }
    */
}
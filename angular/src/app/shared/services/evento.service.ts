import { Http, RequestOptions, Headers, Response } from '@angular/http'
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'
import {Observable} from 'rxjs/Observable'
import 'rxjs/Rx';

import {Evento} from '../models/evento.model'
import { environment } from 'environments/environment';

interface EventosLisRes{
    eventos : Evento[]
}

@Injectable()
export class EventoService{

    private baseUrl = environment.baseUrl

    constructor (private http:Http, private $http: HttpClient){}

    public getEventos(): Observable<EventosLisRes>{
        return this.$http.get<EventosLisRes>(this.baseUrl+`/evento`)
    }
    
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
}
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

    /*
    public getEventos(): Observable<Evento[]>{
        return this.http.get(`${URL}/eventos?_sort=data&_order=asc`)
        .map((resposta:Response ) => resposta.json() )
    }

    public getEventoById(id:string): Observable<Evento[]>{
        return this.http.get(`${URL}/eventos`+"/"+id)
        .map((resposta:Response ) => resposta.json() )
    }

     public postEvento(evento: Evento): Observable<number> { //number
        let headers: Headers = new Headers()
        headers.append('Content-type', 'application/json')
        return this.http.post(
            `${URL}/eventos`,
            JSON.stringify(evento),
            new RequestOptions({ headers: headers })
        )
        .map((resposta: Response) => resposta.json() )
    }

    public updateEvento(evento: Evento): Observable<number>{
        console.log('Atualizando evento')
        let headers: Headers = new Headers()
        headers.append('Content-type', 'application/json')
        console.log(`${URL}/eventos`+"/"+evento.id)
        return this.http.put(
            `${URL}/eventos`+"/"+evento.id,
            JSON.stringify(evento),
            new RequestOptions({ headers: headers })
        )
        .map((resposta: Response) => resposta.json())
    }

    deleteEventoById(id:string): Observable<number> {
        console.log('Deletando evento')
        let headers: Headers = new Headers()
        headers.append('Content-type', 'application/json')
        console.log(`${URL}/eventos`+"/"+id)
        return this.http.delete(
            `${URL}/eventos`+"/"+id,
            new RequestOptions({ headers: headers })
        )
        .map((resposta: Response) => resposta.json())
    }

    private handleError (error: Response | any) {
        console.error(error.message || error);
        return Observable.throw(error.status);
    }
    */
}
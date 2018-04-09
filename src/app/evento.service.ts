import { Http, RequestOptions, Headers, Response } from '@angular/http'
import { Injectable } from '@angular/core'
import {Observable} from 'rxjs/Observable'
import 'rxjs/Rx';

import {URL} from './app.api'

import {Evento} from './shared/evento.model'

@Injectable()
export class EventoService{

    constructor (private http:Http){}

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

    public getEventos(): Observable<Evento[]>{
        return this.http.get(`${URL}/eventos`)
        .map((resposta:Response ) => resposta.json() )
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

    public getEventoById(id:string): Observable<Evento[]>{
        return this.http.get(`${URL}/eventos`+"/"+id)
        .map((resposta:Response ) => resposta.json() )
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
}
import { Http, RequestOptions, Headers, Response } from '@angular/http'
import { Injectable } from '@angular/core'
import {Observable} from 'rxjs/Observable'
import 'rxjs/Rx';

import {URL} from './app.api'

import {Evento} from './shared/evento.model'

@Injectable()
export class EventoService{
   
    constructor (private http:Http){}

    public postEvento(evento: Evento): Observable<number> {

        let headers: Headers = new Headers()

        headers.append('Content-type', 'application/json')

        return this.http.post(
            `${URL}/eventos`,
            JSON.stringify(evento),
            new RequestOptions({ headers: headers })
        )
        .map((resposta: Response) => resposta.json().id )
    }

    public getEventos():Promise<Evento[]>{
        console.log('Passei aqui')
        return this.http.get('http://localhost:3000/eventos')
        .toPromise()
        .then((resposta:any) => resposta.json())

    }
}
import {Evento} from './shared/evento.model'
import {Http} from '@angular/http'
import { Injectable } from '@angular/core';

@Injectable()
export class EventosService{
   
    constructor (private http:Http){}

    public getEventos():Promise<Evento[]>{
        return this.http.get('http://localhost:3000/eventos')
        .toPromise()
        .then((resposta:any) => resposta.json())
    }
}
import { Http, RequestOptions, Headers, Response } from '@angular/http'
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'
import {Observable} from 'rxjs/Observable'
import 'rxjs/Rx';

import {Evento} from '../models/evento.model'
import { environment } from 'environments/environment';
import { Apollo } from 'apollo-angular';
import { ALL_EVENTOS_QUERY, AllEventosQueryResponse, IEvento, ADD_EVENTO, SEARCH_EVENTO, UPDATE_EVENTO, DELETE_EVENTO } from './../graphql/graphql';
import { responsePathAsArray } from 'graphql';
import { resultKeyNameFromField } from 'apollo-utilities';

interface EventosLisRes {
    eventos: Evento[]
}

@Injectable()
export class EventoService {

    private baseUrl = environment.baseUrl

    constructor (
      private http: Http,
      private $http: HttpClient,
      private apollo: Apollo) {}

    public gqlGetEventos(): Observable<AllEventosQueryResponse> {
     return this.apollo
     .query<AllEventosQueryResponse>({query: ALL_EVENTOS_QUERY })
     .map(result => result.data);
    }

    public gqlCreateEvento(evento: Evento): Observable<any> {
      return this.apollo
      .mutate<IEvento>({
        mutation: ADD_EVENTO,
        variables: {evento}
      })
    }

    public gqlSearchEventoById(id: number): Observable <any> {
      return this.apollo
      .query<IEvento>({
        query: SEARCH_EVENTO,
        variables: {id}
      })
      .map(result => result.data);
    }

    public gqlUpdateEvento(id: number, evento: Evento): Observable<any> {
      return this.apollo
      .mutate<IEvento>({
        mutation: UPDATE_EVENTO,
        variables: {id, evento}
      })
    }

    public gqlDeleteEvento(id: number): Observable<any> {
      return this.apollo
      .mutate({
        mutation: DELETE_EVENTO,
        variables: {id}
      })
    }

    public getEventos(): Observable<EventosLisRes> {
        return this.$http.get<EventosLisRes>(this.baseUrl + `/evento`)
    }

    public saveEvento(evento: Evento): Observable<Evento> {
        return this.$http.post<Evento>(this.baseUrl + '/evento/', evento)
    }

    public updateEvento(evento: Evento): Observable<Evento> {
        return this.$http.put<Evento>(this.baseUrl + '/evento/' + evento.id, evento)
    }

    public getEventoById(id: number): Observable<Evento> {
        return this.$http.get<Evento>(this.baseUrl + '/evento/' + id)
    }

    public deleteEventoById(id: number): Observable<Evento> {
        return this.$http.delete<Evento>(this.baseUrl + '/evento/' + id)
    }
}

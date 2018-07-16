import { Evento } from './../models/evento.model';

import gql from 'graphql-tag';

export const ALL_EVENTOS_QUERY = gql `
  query {
    eventoList{
      id
      data
      titulo
      horaInicio
      horaFim
      descricao
      user{
      id
      }
    }
  }
`;

export const ADD_EVENTO = gql `
  mutation eventoCreate($evento: EventoCreate){
    eventoCreate(evento: $evento){
      id
    }
  }
`;

export const UPDATE_EVENTO = gql `
  mutation updateEvento($id: Long!, $evento: EventoUpdate){
    eventoUpdate(id: $id, evento: $evento){
      id
    }
  }
`;

export const DELETE_EVENTO = gql `
  mutation deleteEvento($id: Long!){
    eventoDelete(id: $id){
      sucess
    }
  }
`;

export const SEARCH_EVENTO = gql `
  query evento($id: Long!){
	    evento(id: $id){
		  id
		  titulo
		  data
		  horaInicio
		  horaFim
		  descricao
	  }
  }
`

export interface AllEventosQueryResponse {
  eventoList: Evento[];
}

export interface IEvento {
  evento: Evento;
}

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

export interface AllEventosQueryResponse {
  eventoList: Evento[];
}

export interface AddEvento {
  evento: Evento;
}

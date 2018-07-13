import { User } from './user.model';

export class Evento {

    constructor(
      public titulo: string,
      public data: Date,
      public horaInicio: any,
      public horaFim: any,
      public descricao: string,
      public id?: number,
      public user?: User,
    ) {}
}

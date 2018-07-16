import { User } from './user.model';

export class Evento {

    public id?: number

    constructor(
      public titulo: string,
      public data: string,
      public horaInicio: any,
      public horaFim: any,
      public descricao: string,
      public user?: User
    ) {}
}

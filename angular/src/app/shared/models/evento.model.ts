export class Evento{
    public id: number
    public userId: number
    constructor(
    public titulo: string,
    public data: string,
    //public data: Date,
    public horaInicio: any,
    public horaFim: any,
    public descricao: string
    ){}
}
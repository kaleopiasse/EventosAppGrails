export class Evento{
    public id: number
    constructor(
    public titulo: string,
    public data: Date,
    public horaInicio: any,
    public horaFim: any,
    public descricao: string
    ){}
}
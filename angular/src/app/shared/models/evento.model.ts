export class Evento{
    
    constructor(    
    public titulo: string,
    public data: string,
    public horaInicio: any,
    public horaFim: any,
    public descricao: string,
    public id?: number,
    public userId?: number,
    ){}
}
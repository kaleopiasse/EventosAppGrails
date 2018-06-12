import {Pipe,PipeTransform} from '@angular/core'

@Pipe({
    name:'descricaoReduzida'
})
export class DescricaoReduzida implements PipeTransform{

    transform(texto: string, num:number):string{
        if(texto.length> num){
            return texto.substr(0,num)+'...'
        }
        return texto
    }
}
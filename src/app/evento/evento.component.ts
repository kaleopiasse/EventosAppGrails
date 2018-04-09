import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms'
import {Evento} from '../shared/evento.model'
import {EventoService} from '../evento.service'
import { ActivatedRoute } from '@angular/router';
import {Observable} from 'rxjs/Observable'
import {Router} from '@angular/router';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css'],
  providers: [EventoService]
})
export class EventoComponent implements OnInit {

  //public idEventoSalvo : number
  public evento: Evento[]
  public option: string = 'false'
  public id : string
  public mensagem : boolean = false
  public msg : string = 'teste'

  public formulario: FormGroup = new FormGroup({
    'titulo': new FormControl(null,[Validators.required, Validators.minLength(3), Validators.maxLength(120)]),
    'data': new FormControl(null,[Validators.required, Validators.minLength(3), Validators.maxLength(120)]),
    'horaInicio': new FormControl(null,[Validators.required, Validators.minLength(3), Validators.maxLength(120)]),
    'horaFim': new FormControl(null,[Validators.required, Validators.minLength(3), Validators.maxLength(120)]),
    'descricao': new FormControl(null,[Validators.required, Validators.minLength(3), Validators.maxLength(120)]),
  })

  constructor(private eventoService: EventoService, private route: ActivatedRoute, private router: Router) { 
    this.option = this.route.snapshot.params['option']
    this.id = this.route.snapshot.params['id']
    console.log(this.option, this.id)
    if(this.option==='true'){
      this.preencherEvento()
    }
  }

  ngOnInit() {
  }

  public salvarEvento(): void {
    if(this.formulario.status === 'INVALID'){
      this.formulario.get('titulo').markAsTouched()
      this.formulario.get('data').markAsTouched()
      this.formulario.get('horaInicio').markAsTouched()
      this.formulario.get('horaFim').markAsTouched()
      this.formulario.get('descricao').markAsTouched()
    }
    else{
      let evento: Evento = new Evento(
        this.formulario.value.titulo,
        this.formulario.value.data,
        this.formulario.value.horaInicio,
        this.formulario.value.horaFim,
        this.formulario.value.descricao
      )

      this.eventoService.postEvento(evento)
      .subscribe((idEvento: number) => {
        console.log(idEvento)
        this.feedbackUser("Evento salvo com sucesso !!!")
      })
    }
  }

  public atualizarEvento(){
    let evento: Evento = new Evento(
      this.formulario.value.titulo,
      this.formulario.value.data,
      this.formulario.value.horaInicio,
      this.formulario.value.horaFim,
      this.formulario.value.descricao
    )
    evento.id=parseInt(this.id)
    console.log("Atualizar evento")
    console.log(evento)

    this.eventoService.updateEvento(evento)
    .subscribe((idEvento: number) => {
      console.log(idEvento)
      this.feedbackUser("Evento atualizado com sucesso !!!")
    })
  }

  public preencherEvento(){
    console.log("Preenchendo dados evento")
    this.eventoService.getEventoById(this.id)
    .subscribe((evento: Evento[]) =>{
      this.evento = evento
      this.formulario.setValue({
        titulo:evento['titulo'], 
        data:evento['data'], 
        horaInicio:evento['horaInicio'], 
        horaFim: evento['horaFim'], 
        descricao:evento['descricao']})
    })
  }

  public deletarEvento(){
    this.eventoService.deleteEventoById(this.id)
    .subscribe((code: number) => {
      console.log(code)
      this.feedbackUser("Evento deletado com sucesso !!!")
    })
  }

  public limparForm(){
    this.formulario.setValue({
      titulo:[''], 
      data:[''], 
      horaInicio:[''], 
      horaFim:[''], 
      descricao:['']})
  }

  public feedbackUser(msg:string){
    this.msg = msg
    this.mensagem=true
    this.limparForm()
    setTimeout(()=>(this.router.navigate(['/home'])),4000)
  }
}

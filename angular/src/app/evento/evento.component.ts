import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Evento } from '../shared/evento.model'
import { EventoService } from '../evento.service'
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable'
import { Router } from '@angular/router';
import { parse } from 'path';

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
  public id: string
  public mensagem: boolean = false
  public msg: string = ''

  public formulario: FormGroup = new FormGroup({
    'titulo': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(120)]),
    'data': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(120)]),
    'horaInicio': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(120)]),
    'horaFim': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(120)]),
    'descricao': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(120)]),
  })

  constructor(private eventoService: EventoService, private route: ActivatedRoute, private router: Router) {
    this.option = this.route.snapshot.params['option']
    this.id = this.route.snapshot.params['id']
    console.log(this.option, this.id)
    if (this.option === 'true') {
      this.preencherEvento()
    }
  }

  ngOnInit() {
  }

  public salvarEvento(): void {
    if (this.formulario.status === 'INVALID') {
      this.formulario.get('titulo').markAsTouched()
      this.formulario.get('data').markAsTouched()
      this.formulario.get('horaInicio').markAsTouched()
      this.formulario.get('horaFim').markAsTouched()
      this.formulario.get('descricao').markAsTouched()
      console.log(this.verificaData())
    }
    else {
      let evento: Evento = new Evento(
        this.formulario.value.titulo,
        this.formulario.value.data,
        this.formulario.value.horaInicio,
        this.formulario.value.horaFim,
        this.formulario.value.descricao
      )

      evento.data = (new Intl.DateTimeFormat('pt-BR').format(new Date(evento.data)))
      console.log(this.verificaData())

      /*this.eventoService.postEvento(evento)
        .subscribe((idEvento: number) => {
          console.log(idEvento)
          this.feedbackUser("Evento salvo com sucesso !!!")
        })*/

      this.eventoService.saveEvento(evento)
      .subscribe(res => {
        console.log(res)
        this.feedbackUser("Evento salvo com sucesso !!!");
      })
    }
  }

  public atualizarEvento() {
    let evento: Evento = new Evento(
      this.formulario.value.titulo,
      this.formulario.value.data,
      this.formulario.value.horaInicio,
      this.formulario.value.horaFim,
      this.formulario.value.descricao
    )
    evento.id = parseInt(this.id)
    evento.data = (new Intl.DateTimeFormat('pt-BR').format(new Date(evento.data)))
    console.log("Atualizar evento")
    console.log(evento)

    /*
    this.eventoService.updateEvento(evento)
      .subscribe((idEvento: number) => {
        console.log(idEvento)
        this.feedbackUser("Evento atualizado com sucesso !!!")
      })
    */

    this.eventoService.updateEvento(evento)
    .subscribe(res => {
      console.log(res)
      this.feedbackUser("Evento atualizado com sucesso !!!")
    })

  }

  public preencherEvento() {
    console.log("Preenchendo dados evento")
    this.eventoService.getEventoById(parseInt(this.id))
      .subscribe((evento: Evento) => {
        //this.evento = evento
        this.formulario.setValue({
          titulo: evento['titulo'],
          data: evento['data'],
          horaInicio: evento['horaInicio'],
          horaFim: evento['horaFim'],
          descricao: evento['descricao']
        })
      })
  }

  public deletarEvento() {
    this.eventoService.deleteEventoById(parseInt(this.id))
      .subscribe((res => {
        console.log(res)
        this.feedbackUser("Evento deletado com sucesso !!!")
      })
  }

  public limparForm() {
    this.formulario.setValue({
      titulo: [''],
      data: [''],
      horaInicio: [''],
      horaFim: [''],
      descricao: ['']
    })
  }

  public feedbackUser(msg: string) {
    this.msg = msg
    this.mensagem = true
    setTimeout(() => (this.router.navigate(['/home'])), 2000)
    this.limparForm()
    this.formulario.get('titulo').markAsUntouched()
    this.formulario.get('data').markAsUntouched()
    this.formulario.get('horaInicio').markAsUntouched()
    this.formulario.get('horaFim').markAsUntouched()
    this.formulario.get('descricao').markAsUntouched()
  }

  public verificaData() {
    var data_atual = new Date()
    var diaDoMes = data_atual.getDate()
    data_atual.setDate(diaDoMes - 1)
    var data_usuario = new Date(this.formulario.value.data)

    if (data_usuario < data_atual) {
      this.formulario.get('data').invalid
      return false
    }
    return true
  }

  public verificaHora() {
    var horaInicio = this.formulario.value.horaInicio
    var horaFim = this.formulario.value.horaFim

    if (horaInicio != null && horaFim != null) {
      if (horaInicio > horaFim) {
        this.formulario.get('horaFim').invalid
        return false
      }
    }
    return true
  }
}

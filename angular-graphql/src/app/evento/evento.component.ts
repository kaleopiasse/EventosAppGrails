import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Evento } from '../shared/models/evento.model'
import { EventoService } from '../shared/services/evento.service'
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable'
import { Router } from '@angular/router';
import { parse } from 'path';
import { User } from '../shared/models/user.model';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css'],
  providers: [EventoService]
})
export class EventoComponent implements OnInit {

  // public idEventoSalvo : number
  public eventos: Evento[]
  public option: string = 'false'
  public id: string
  public mensagem: boolean = false
  public msg: string = ''
  authUser;

  public formulario: FormGroup = new FormGroup({
    'titulo': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(120)]),
    'data': new FormControl(null, [Validators.required, Validators.minLength(9), Validators.maxLength(10)]),
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
    this.authUser = JSON.parse(localStorage.getItem('loginData'));
    this.eventoService.getEventos()
    .subscribe(res => {
        this.eventos = res.eventos
        console.log(res.eventos)
      })
  }

  public salvarEvento(): void {
    const user: User = new User (this.authUser.id, this.authUser.username)

    if (this.formulario.status === 'INVALID') {
      this.formulario.get('titulo').markAsTouched()
      this.formulario.get('data').markAsTouched()
      this.formulario.get('horaInicio').markAsTouched()
      this.formulario.get('horaFim').markAsTouched()
      this.formulario.get('descricao').markAsTouched()
    } else {
        const evento: Evento = new Evento(
        this.formulario.value.titulo,
        this.formulario.value.data,
        this.formulario.value.horaInicio,
        this.formulario.value.horaFim,
        this.formulario.value.descricao,
        user
      )
      // console.log(this.authUser)
      // evento.user.id = (parseInt(this.authUser.id))
      console.log(evento)

      this.eventoService.gqlCreateEvento(evento)
      .subscribe(res => {
        console.log(res)
        this.feedbackUser('Evento salvo com sucesso !!!');
      })

    }
  }

  public atualizarEvento() {
    const user: User = new User (this.authUser.id, this.authUser.username)
    const evento: Evento = new Evento(
      this.formulario.value.titulo,
      this.formulario.value.data,
      this.formulario.value.horaInicio,
      this.formulario.value.horaFim,
      this.formulario.value.descricao,
      user
    )
    // evento.data = this.formDate()
    console.log('Atualizar evento')
    console.log(evento)

    this.eventoService.gqlUpdateEvento((parseInt(this.id)), evento)
    .subscribe(res => {
      console.log(res)
      this.feedbackUser('Evento atualizado com sucesso !!!')
    })

  }

  public preencherEvento() {
    console.log('Preenchendo dados evento', this.id)
    this.eventoService.gqlSearchEventoById(parseInt(this.id))
    .subscribe((res) => {
      this.formulario.setValue({
        titulo: res.evento['titulo'],
        data: res.evento['data'],
        horaInicio: res.evento['horaInicio'],
        horaFim: res.evento['horaFim'],
        descricao: res.evento['descricao']
      })
    })
  }

  public deletarEvento() {
    this.eventoService.deleteEventoById(parseInt(this.id))
      .subscribe(res => {
        console.log(res)
        this.feedbackUser('Evento deletado com sucesso !!!')
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
    const data_atual = new Date()
    const diaDoMes = data_atual.getDate()
    data_atual.setDate(diaDoMes - 1)
    const data_usuario = new Date(this.formulario.value.data)

    if (data_usuario <= data_atual) {
      this.formulario.get('data').invalid;
      return false
    }
    return true
  }

  public verificaHora() {
    const horaInicio = this.formulario.value.horaInicio
    const horaFim = this.formulario.value.horaFim

    if (horaInicio != null && horaFim != null) {
      if (horaInicio > horaFim) {
        this.formulario.get('horaFim').invalid
        return false
      }
    }
    return true
  }

  public existEvent() {
    let achou;
    // tslint:disable-next-line:forin
    for (let e in this.eventos) {
      const dt = this.eventos[e].data.split('/')
      const data = new Date(dt[1] + '/' + dt[0] + '/' + dt[2]);
      const dtUser = new Date(this.formulario.value.data)
      const dia = dtUser.getDate()
      dtUser.setDate(dia + 1)
      if (dtUser.getFullYear() === data.getFullYear() && dtUser.getMonth() === data.getMonth()){
        if (dtUser.getDate() === data.getDate()
        && this.formulario.value.horaInicio === this.eventos[e].horaInicio
        && this.formulario.value.horaFim === this.eventos[e].horaFim) {
          achou = true
        }
      }
    }
    return achou
  }

  public formDate() {
    let dataFormatada;
    const data_atual = new Date(this.formulario.value.data)
    const diaDoMes = data_atual.getDate()
    data_atual.setDate(diaDoMes + 1)
    return dataFormatada = (new Intl.DateTimeFormat('pt-BR').format(data_atual))
  }

  public comparaData() {

  }
}

import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms'
import {Evento} from '../shared/evento.model'
import {EventoService} from '../evento.service'

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css'],
  providers: [EventoService]
})
export class EventoComponent implements OnInit {

  //public idEventoSalvo : number

  public formulario: FormGroup = new FormGroup({
    'titulo': new FormControl(null,[Validators.required, Validators.minLength(3), Validators.maxLength(120)]),
    'data': new FormControl(null,[Validators.required, Validators.minLength(3), Validators.maxLength(120)]),
    'horaInicio': new FormControl(null,[Validators.required, Validators.minLength(3), Validators.maxLength(120)]),
    'horaFim': new FormControl(null,[Validators.required, Validators.minLength(3), Validators.maxLength(120)]),
    'descricao': new FormControl(null,[Validators.required, Validators.minLength(3), Validators.maxLength(120)]),
  })

  constructor(private eventoService: EventoService) { }

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
      })
    }
  }
}

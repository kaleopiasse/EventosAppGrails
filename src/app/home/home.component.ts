import { Component, OnInit } from '@angular/core';
import { EventoService } from '../evento.service'
import { Evento } from '../shared/evento.model'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [EventoService]
})
export class HomeComponent implements OnInit {

  public evento: Evento[]

  constructor(private eventoService: EventoService) { }

  ngOnInit() {
    this.eventoService.getEventos()
      .then((evento: Evento[]) => {
        this.evento = evento
      })
      .catch((param: any) => {
        console.log(param)
      })
  }
}

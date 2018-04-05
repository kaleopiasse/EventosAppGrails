import { Component, OnInit } from '@angular/core';
import { EventosService } from '../eventos.service'
import { Evento } from '../shared/evento.model'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [EventosService]
})
export class HomeComponent implements OnInit {

  public eventos: Evento[]

  constructor(private eventosService: EventosService) { }

  ngOnInit() {
    this.eventosService.getEventos()
      .then((eventos: Evento[]) => {
        this.eventos = eventos
      })
      .catch((param: any) => {
        console.log(param)
      })
  }

}

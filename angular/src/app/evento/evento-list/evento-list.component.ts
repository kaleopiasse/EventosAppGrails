import { Component, OnInit } from '@angular/core';
import { EventoService } from '../../shared/services/evento.service'
import { Evento } from '../../shared/models/evento.model'
import {Router} from '@angular/router';


@Component({
  selector: 'app-evento-list',
  templateUrl: './evento-list.component.html',
  styleUrls: ['./evento-list.component.css'],
  providers: [EventoService]
})
export class EventoListComponent implements OnInit {

  public evento: Evento[]

  constructor(private eventoService: EventoService, private router: Router) { }

  ngOnInit() {
    this.eventoService.getEventos()
    .subscribe(res => {
        this.evento = res.eventos
        console.log(res.eventos)
      })
  }

  public enviarEvento(id : number){
    this.router.navigate(['/evento/true/',id]) 
  }

}
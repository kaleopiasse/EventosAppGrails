import { Component, OnInit } from '@angular/core';
import { EventoService } from '../evento.service'
import { Evento } from '../shared/evento.model'
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [EventoService]
})
export class HomeComponent implements OnInit {

  public evento: Evento[]

  constructor(private eventoService: EventoService, private router: Router) { }

  ngOnInit() {
    this.eventoService.getEventos()
      .subscribe((evento: Evento[]) => {
        this.evento = evento
        console.log(evento)
      })
  }

  public enviarEvento(id : number){
    this.router.navigate(['/evento/true/',id]) 
  }
}

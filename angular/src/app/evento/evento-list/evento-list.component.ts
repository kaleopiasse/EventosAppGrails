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
  authUser;

  constructor(private eventoService: EventoService, private router: Router) { }

  ngOnInit() {
    this.eventoService.getEventos()
    .subscribe(res => {
        this.evento = res.eventos
        console.log(res.eventos)
      })

    this.authUser = JSON.parse(localStorage.getItem('loginData'));
  }

  public enviarEvento(id : number){
    this.router.navigate(['home/evento/true/'+id]) 
  }

  public updateIs(id:any){
    if(this.authUser.id === id){
      return true
    }
  }

}
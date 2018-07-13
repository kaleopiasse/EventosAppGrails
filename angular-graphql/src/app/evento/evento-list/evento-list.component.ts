import { Component, OnInit } from '@angular/core';
import { EventoService } from '../../shared/services/evento.service'
import { Evento } from '../../shared/models/evento.model'
import {Router} from '@angular/router';
import { User } from '../../shared/models/user.model';
import { UserService } from '../../shared/services/user.service';
import {FormBuilder, FormGroup, FormArray, NgForm, NgModel } from '@angular/forms';
import { Convite } from '../../shared/models/convite.model';
import { Observable } from 'rxjs/Rx';


@Component({
  selector: 'app-evento-list',
  templateUrl: './evento-list.component.html',
  styleUrls: ['./evento-list.component.css'],
  providers: [EventoService, UserService]
})
export class EventoListComponent implements OnInit {

  public evento: Evento[]
  public user = []
  public convite: Convite
  public convites = []
  authUser;

  constructor(private eventoService: EventoService,
    private router: Router,
    private userService: UserService) {}

  ngOnInit() {
    /*
    this.eventoService.getEventos()
    .subscribe(res => {
      this.evento = res.eventos
    })
    */

    this.userService.getUsers()
    .subscribe(res => {
      this.user = res.users;
      // console.log(this.user)
    })

    this.eventoService.gqlGetEventos()
    // .subscribe(response => console.log(response.eventoList));
    .subscribe(response => this.evento = response.eventoList);
    console.log(this.evento)

    this.authUser = JSON.parse(localStorage.getItem('loginData'));
  }

  public enviarEvento(id: any) {
    this.router.navigate(['home/evento/true/' + id])
  }

  public updateIs(id: any) {
    if (this.authUser.id === id) {
      return true
    }
  }

  public convidarUsuario(user: User) {
    if (user.selected === true) {
      user.selected = false
    }else {
      user.selected = true
    }
    console.log(user);
  }

  debug(userId: number, eventoId: number) {

    // console.log(form)


    console.log(this.convites)

    let convite: Convite = new Convite(userId, eventoId, true);

    console.log(convite)

    if (this.convites === null || this.convites.length === 0) {
      console.log('è nulo')
      this.convites.push(convite);
    }else {
      console.log('Não é nulo!!!')
      for (let i = 0; i < this.convites.length; i++) {
        console.log('For')
        if ((this.equals(this.convites[i], convite))) {
          console.log('é igual !!!')
          this.convites[i].flag = false
        }
      }
      this.convites.push(convite)
      console.log('não é igual')
    }
    console.log(this.convites)
  }

  public equals(object1, object2) {
    var prop1 = Object.getOwnPropertyNames(object1);
    var prop2 = Object.getOwnPropertyNames(object1);

    if (prop1.length !== prop2.length) {
      return false;
    }

    if (prop1.length === 0) {
      if (object1 === object2) {
        return true;
      } else {
        return false;
      }
    }

    for (let i = 0; i < prop1.length; i++) {
      let prop = prop1[i];
      if (object1[prop] !== object2[prop]) {
        if (this.equals(object1[prop], object2[prop])) {
          continue;
        } else {
          return false;
        }
      }
    }
    return true;
  }

  public pesquisa(termoDaPesquisa: string): void{
    this.userService.getUserByName(termoDaPesquisa)
    .subscribe(res => {
      this.user = res.users;
      console.log(this.user)
    })
    console.log(termoDaPesquisa)
  }
}

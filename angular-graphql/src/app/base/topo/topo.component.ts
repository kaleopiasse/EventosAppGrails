import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../shared/services/login.service';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css']
})
export class TopoComponent implements OnInit {

  //public srOnly: string = 'sr-only'

  constructor(
    private loginService: LoginService
  ){}

  ngOnInit(){
  }

  public isLoggedIn(){
    return this.loginService.isLoggedIn()
  }

  public logout() {
    this.loginService.logout()
  }

}

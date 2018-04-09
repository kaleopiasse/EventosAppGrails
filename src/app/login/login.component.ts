import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms'
import {Login} from '../shared/login.model'
import {LoginService} from '../login.service'
import {Observable} from 'rxjs/Observable'
import 'rxjs/Rx';
import { Injectable, EventEmitter } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})


export class LoginComponent implements OnInit {

  public res : Login[]

  constructor(private loginService: LoginService, private router: Router) {}

  public formulario: FormGroup = new FormGroup({
    'email': new FormControl(null,[Validators.required, Validators.minLength(3), Validators.maxLength(120)]),
    'senha': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(120)])
  })

  ngOnInit() {
    this.loginService.getLogin()
        .subscribe((login : Login[]) => this.res = login)
  }

  public validarLogin(): void{
    if(this.formulario.status === 'INVALID'){
      this.formulario.get('email').markAsTouched()
      this.formulario.get('senha').markAsTouched()
    }
    else{
      let login: Login = new Login(
        this.formulario.value.email,
        this.formulario.value.senha
      )
      if(login.email===this.res[0].email && login.senha === this.res[0].senha){
        this.router.navigate(['/home'])
      }
      else{
        console.log('Falhou')
      }
    }
  }
}

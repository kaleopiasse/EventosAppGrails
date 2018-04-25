import { BrowserModule } from '@angular/platform-browser';
import { NgModule,LOCALE_ID } from '@angular/core';
//import { FormsModule } from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms'
import { HttpModule } from '@angular/http';
import {RouterModule} from '@angular/router'
//import { registerLocaleData } from '@angular/common';
//import ptBr from '@angular/common/locales/pt';

import {ROUTES} from './app.routes'

import { AppComponent } from './app.component';
import { TopoComponent } from './topo/topo.component';
import { LoginComponent } from './login/login.component';
import { EventoComponent } from './evento/evento.component';
import { HomeComponent } from './home/home.component';
import { RodapeComponent } from './rodape/rodape.component';
import { LoginService } from './login.service';

//Pipe descricao reduzida
import {DescricaoReduzida} from './descricao-reduzida.pipe'

@NgModule({
  declarations: [
    AppComponent,
    TopoComponent,
    LoginComponent,
    EventoComponent,
    HomeComponent,
    RodapeComponent,
    DescricaoReduzida
  ],
  imports: [
    BrowserModule,
    //FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [LoginService, { provide: LOCALE_ID, useValue: 'pt' }],
  bootstrap: [AppComponent]
})
export class AppModule { }

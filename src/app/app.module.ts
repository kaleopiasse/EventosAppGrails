import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//import { FormsModule } from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms'
import { HttpModule } from '@angular/http';
import {RouterModule} from '@angular/router'

import {ROUTES} from './app.routes'

import { AppComponent } from './app.component';
import { TopoComponent } from './topo/topo.component';
import { LoginComponent } from './login/login.component';
import { EventoComponent } from './evento/evento.component';
import { HomeComponent } from './home/home.component';
import { RodapeComponent } from './rodape/rodape.component';
import { LoginService } from './login.service';

@NgModule({
  declarations: [
    AppComponent,
    TopoComponent,
    LoginComponent,
    EventoComponent,
    HomeComponent,
    RodapeComponent,
  ],
  imports: [
    BrowserModule,
    //FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule,LOCALE_ID } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms'
import { HttpModule } from '@angular/http';
import {RouterModule} from '@angular/router'

import {ROUTES, AppRoutingModule} from './app-routing.module'

import { AppComponent } from './app.component';
import { TopoComponent } from './base/topo/topo.component';
import { RodapeComponent } from './base/rodape/rodape.component';
import { LoginService } from './shared/services/login.service';

import { HttpClientModule } from '@angular/common/http';
import { LoginModule } from './login/login.module';
import { EventoModule } from './evento/evento.module';

@NgModule({
  declarations: [
    AppComponent,
    TopoComponent,
    RodapeComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    LoginModule,
    EventoModule,
    AppRoutingModule
  ],
  providers: [LoginService, { provide: LOCALE_ID, useValue: 'pt' }],
  bootstrap: [AppComponent]
})
export class AppModule { }

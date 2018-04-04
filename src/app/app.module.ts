import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AcessoComponent } from './acesso/acesso.component';
import { TopoComponent } from './topo/topo.component';
import { LoginComponent } from './acesso/login/login.component';
import { CadastroEventoComponent } from './cadastro-evento/cadastro-evento.component';

@NgModule({
  declarations: [
    AppComponent,
    AcessoComponent,
    TopoComponent,
    LoginComponent,
    CadastroEventoComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

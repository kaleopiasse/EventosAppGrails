import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EventoRoutingModule } from './evento-routing.module';

import { EventoComponent } from './evento.component';
import { EventoListComponent } from './evento-list/evento-list.component';

import { DescricaoReduzida } from '../shared/pipes/descricao-reduzida.pipe';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EventoRoutingModule
  ],
  declarations: [
    EventoComponent,
    EventoListComponent,
    DescricaoReduzida
  ]
})
export class EventoModule { }

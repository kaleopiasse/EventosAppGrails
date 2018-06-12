import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { EventoComponent } from './evento.component';
import { EventoListComponent } from './evento-list/evento-list.component';

import { DescricaoReduzida } from '../shared/pipes/descricao-reduzida.pipe';
import { EventoRoutingModule } from './evento-routing.module';

@NgModule({
  imports: [
    CommonModule,
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

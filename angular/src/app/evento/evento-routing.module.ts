import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router'

import {EventoComponent} from './evento.component'
import { EventoListComponent } from './evento-list/evento-list.component';

export const ROUTES: Routes = [
    {path:'', component: EventoListComponent},
    {path:'evento/:option/:id', component: EventoComponent}
]

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
    providers: []
  })
  
export class EventoRoutingModule { }
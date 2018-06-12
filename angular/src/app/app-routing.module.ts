import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router'

import {LoginComponent} from './login/login.component'


export const ROUTES: Routes = [
    {path:'', loadChildren: './login/login.module#LoginModule'},
    {path:'home', loadChildren: './evento/evento.module#EventoModule'},

]

@NgModule({
    imports: [RouterModule.forRoot(ROUTES)],
    exports: [RouterModule]
  })

export class AppRoutingModule { }
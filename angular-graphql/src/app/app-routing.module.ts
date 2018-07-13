import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router'

import {LoginComponent} from './login/login.component'
import { AuthGuard } from './shared/guards/auth.guard';


export const ROUTES: Routes = [
    {path:'', loadChildren: './login/login.module#LoginModule'},
    {path:'home', loadChildren: './evento/evento.module#EventoModule', canActivate:[AuthGuard]},

]

@NgModule({
    imports: [RouterModule.forRoot(ROUTES)],
    exports: [RouterModule]
  })

export class AppRoutingModule { }
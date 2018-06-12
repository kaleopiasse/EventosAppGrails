import {Routes} from '@angular/router'

import {LoginComponent} from './login/login.component'
import {HomeComponent} from './home/home.component'
import {EventoComponent} from './evento/evento.component'

export const ROUTES: Routes = [
    {path:'', component: LoginComponent},
    {path:'home', component: HomeComponent},
    {path:'evento/:option/:id', component: EventoComponent}
]
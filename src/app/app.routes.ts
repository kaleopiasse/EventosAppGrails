import {Routes} from '@angular/router'

import {LoginComponent} from './acesso/login/login.component'
import {HomeComponent} from './home/home.component'
import {CadastroEventoComponent} from './cadastro-evento/cadastro-evento.component'

export const ROUTES: Routes = [
    {path:'', component: LoginComponent},
    {path:'home', component: HomeComponent},
    {path:'cadastroEvento', component: CadastroEventoComponent}
]
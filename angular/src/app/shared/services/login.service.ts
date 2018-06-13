import {Http, RequestOptions, Headers, Response} from '@angular/http'
import {Injectable, EventEmitter} from '@angular/core'
import {Login} from '../models/login.model'
import {Observable} from 'rxjs/Observable'
import 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';

@Injectable({
    providedIn:'root'
})
export class LoginService{

    private baseUrl = environment.baseUrl

    constructor(
        private http:HttpClient,
        private router: Router
    ){}
    /*
    public getLogin(): Observable<Login[]>{
        return this.http.get(`${URL}/login`)
        .map((res: Response) => res.json())
    }
    */

   public doLogin(authUser) {
    // user
    // 1234
    this.authenticate(authUser).subscribe(res => {
      console.log(res)
    localStorage.setItem('loginData', JSON.stringify(res));
    this.router.navigate(['/home']);
    return true
    }, err => {
      console.log(err);
    });
  }

  private authenticate(authUser) {
    return this.http.post(this.baseUrl + '/login', authUser);
  }

  public isLoggedIn() {
    return Boolean(localStorage.getItem('loginData'));
  }

  public logout() {
    localStorage.removeItem('loginData');
    this.router.navigate(['']);
  }
}
import { Injectable } from '@angular/core';
import { 
    HttpRequest, 
    HttpHandler, 
    HttpEvent,
    HttpInterceptor, 
    HttpResponse, 
    HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';


@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
    authUser: any;
    constructor(
        private router: Router
    ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler,): Observable<HttpEvent<any>> {
        this.authUser = JSON.parse(localStorage.getItem('loginData'));
        console.log(this.authUser)
        if (this.authUser) {
            request = request.clone({
                setHeaders: {
                    token: this.authUser.token,
                },
            });
        }

        return next.handle(request)
            .pipe(
                tap((event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse) {
                        // Success nothing TODO
                    }
                }, (err: any) => {
                    // nada
                    if (err instanceof HttpErrorResponse) {
                        switch (err.status) {
                            case 401: {
                                localStorage.clear();
                                this.router.navigate(['']);
                                // location.reload();
                                break;
                            }
                            case 500: {
                                // TODO erroInterno
                                break;
                            }
                            default: {
                                // TODO erroGenérico
                                break;
                            }
                        }
                    }
                })
            );
    }
}

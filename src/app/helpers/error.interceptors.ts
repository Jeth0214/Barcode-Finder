import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert.service';



@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private authenticationService: AuthenticationService,
        private router: Router,
        private alertService: AlertService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler,): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError((error: HttpErrorResponse) => {
            console.log(error);

            if (error.status === 401) {
                // auto logout if 401 response returned from api
                this.authenticationService.logout();
                this.alertService.alertError(error.status, 'Unauthorized');
                // location.reload();
                this.router.navigate(['/login']);
            }

            const errors = error.error.message || error.statusText;
            return throwError(errors);
        }))
    }


}
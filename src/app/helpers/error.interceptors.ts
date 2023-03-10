import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { AlertController } from '@ionic/angular';



@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private authenticationService: AuthenticationService,
        private alertController: AlertController) { }

    intercept(request: HttpRequest<any>, next: HttpHandler,): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError((error: HttpErrorResponse) => {
            console.log(error);
            this.alertError(error)

            if (error.status === 401) {
                // auto logout if 401 response returned from api
                this.authenticationService.logout();
                location.reload();
            }

            const errors = error.error.message || error.statusText;
            return throwError(errors);
        }))
    }

    async alertError(error: HttpErrorResponse) {
        const alert = await this.alertController.create({
            header: 'Error',
            subHeader: error.status.toString(),
            message: error.statusText,
            buttons: ['OK']
        })

        return await alert.present()
    }
}
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Transfer } from '../models/transfer.model';
import { AuthenticationService } from './authentication.service';


@Injectable({
  providedIn: 'root'
})
export class TransferService {

  service = '/transfers';
  headers: HttpHeaders;

  constructor(private http: HttpClient, private authService: AuthenticationService) {
    this.headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': `Bearer ${this.authService.tokenValue}`
    })
  }

  getTransfer(id: number): Observable<Transfer> {
    return this.http.get<Transfer>(`${environment.apiBaseUrl}${this.service}/${id}`, { headers: this.headers });
  }

  addTransfer(transfer): Observable<Transfer> {
    return this.http.post<Transfer>(`${environment.apiBaseUrl}${this.service}`, transfer, { headers: this.headers });
  }

  updateTransfer(id: number, transfer: Transfer): Observable<Transfer> {
    return this.http.put<Transfer>(`${environment.apiBaseUrl}${this.service}/${id}`, transfer, { headers: this.headers });
  }

  deleteTransfer(transferId): Observable<Transfer> {
    return this.http.delete<Transfer>(`${environment.apiBaseUrl}${this.service}/${transferId}`, { headers: this.headers });
  };
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Transfer } from '../models/transfer.model';

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  constructor(private http: HttpClient) { }

  getTransfer(id: number): Observable<Transfer> {
    return this.http.get<Transfer>(`${environment.apiBaseUrl}/transfers/${id}`);
  }

  addTransfer(transfer): Observable<Transfer> {
    return this.http.post<Transfer>(`${environment.apiBaseUrl}/transfers`, transfer);
  }

  updateTransfer(id: number, transfer: Transfer): Observable<Transfer> {
    return this.http.put<Transfer>(`${environment.apiBaseUrl}/transfers/${id}`, transfer);
  }

  deleteTransfer(transferId): Observable<Transfer> {
    return this.http.delete<Transfer>(`${environment.apiBaseUrl}/transfers/${transferId}`);
  };
}

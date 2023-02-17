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
}

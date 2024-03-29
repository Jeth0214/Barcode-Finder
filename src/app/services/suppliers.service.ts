import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Supplier } from '../models/supplier.model';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class SuppliersService {

  headers: HttpHeaders;
  service: string = '/suppliers';

  constructor(private http: HttpClient, private authService: AuthenticationService) {

  }

  getAllSuppliers(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(`${environment.apiBaseUrl}${this.service}`);
  };

  getSupplierTransfers(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiBaseUrl}${this.service}/${id}`);
  }
}

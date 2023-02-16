import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Supplier } from '../models/supplier.model';

@Injectable({
  providedIn: 'root'
})
export class SuppliersService {

  constructor(private http: HttpClient) { }

  getAllSuppliers(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(`${environment.apiBaseUrl}/suppliers`);
  };

  getSupplierTransfers(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiBaseUrl}/suppliers/${id}`);
  }
}

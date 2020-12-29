import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  constructor(private http: HttpClient) { }

  getOrders(): Observable<any>{
    return this.http.get(`${environment.baseurl}/api/user-payment/retrieveAllOrders`);
  }
  
  payment(paymentObject): Observable<any>{
    return this.http.post(`${environment.baseurl}/api/user-payment/payment`,paymentObject);
  }

}

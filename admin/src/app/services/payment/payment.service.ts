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

  updatePaymentIdByOrderId(orderId,paymentId):Observable<any>{
    return this.http.put(`${environment.baseurl}/api/user-payment/updatePaymentIdByOrderId/${orderId}`,{paymentId})
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(private http: HttpClient) { }

  purchase(object):Observable<any>{
    return this.http.post(`${environment.baseurl}/api/user-purchase/purchase`,object);
  }
}

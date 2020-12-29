import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SizeService {

  constructor(private http: HttpClient) { }

  getSizes(prodId): Observable<any> {
    return this.http.get(`${environment.baseurl}/api/listSizesByProdId/${prodId}`);
  }


}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getProducts() : Observable<any>{
    return this.http.get(`${environment.baseurl}/api/products/retrieveinfos`);
  }

  addProduct(product) : Observable<any>{
    return this.http.post(`${environment.baseurl}/api/products/create`, product);
  }

  deleteProduct(prodId):Observable<any>{
    return this.http.delete(`${environment.baseurl}/api/products/deletebyid/${prodId}`)
  }

  updateProduct(prodId,product):Observable<any>{
    return this.http.put(`${environment.baseurl}/api/products/updatebyid/${prodId}`,product)
  }

  getProduct(prodId):Observable<any>{
    return this.http.get(`${environment.baseurl}/api/products/retreivebyid/${prodId}`)
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(private http: HttpClient) { }

  pushFilesToStorage(files, prodId): Observable<any> {
    const formdata: FormData = new FormData();
    if(files){
      [...files].forEach(file => {
        formdata.append('files', file)
      });
    }
    return this.http.post(`${environment.baseurl}/api/file/uploadFiles/${prodId}`, formdata);
  }

  getFiles(prodId): Observable<any> {
    return this.http.get(`${environment.baseurl}/api/listFilesByProdId/${prodId}`);
  }

}
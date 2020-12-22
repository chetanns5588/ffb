import { Injectable } from '@angular/core';
import swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  constructor() { }

  alertMessage(icon,error){
    swal.fire({
      icon: icon,
      text: error,
      allowOutsideClick: false
    }).then((result) => {
      if (result.value) {
        return false;
      }
    });
  }
}

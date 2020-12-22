import { Component, Input, OnInit } from '@angular/core';
import { UploadFileService } from 'src/app/services/upload-files/upload-files.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  newArrival: boolean = false;
  @Input() item;

  prodImage
  constructor(private uploadService: UploadFileService) { }

  ngOnInit(): void {
    this.getFiles();
    this.checkDate();
  }

  getFiles(){
    this.uploadService.getFiles(this.item.id)
    .subscribe(async (data)=>{
      if(data[0] && data[0].path){
        this.prodImage = environment.baseurl + '/' + data[0].path;
      }
    })
  }

  checkDate(){
    if(this.item){
      var checkDate = new Date(this.item.updatedAt).toJSON().slice(0,10);
      var from = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000);
      var to   = new Date();
      var check = new Date(checkDate);
      this.newArrival = (check > from && check < to)?true: false;
    }
  }
}

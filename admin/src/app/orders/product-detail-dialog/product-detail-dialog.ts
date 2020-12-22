import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductsService } from 'src/app/services/products/products.service';
import { SweetAlertService } from 'src/app/services/sweet-alert/sweet-alert.service';
import { UploadFileService } from 'src/app/services/upload-files/upload-files.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'product-detail-dialog',
    templateUrl: 'product-detail-dialog.html',
    styleUrls: ['product-detail-dialog.scss']
})
export class ProductDetailDialog implements OnInit {
    product
    relativeImages = [];
    constructor(public dialogRef: MatDialogRef<ProductDetailDialog>,
        private productsService: ProductsService,
        private uploadService: UploadFileService,
        private sweetAlertService: SweetAlertService,
        @Inject(MAT_DIALOG_DATA) public data) {
        
    }
    
    ngOnInit() {
        this.showProductDetail(this.data);
    }
    showProductDetail(prodId){
        this.productsService.getProduct(prodId)
              .subscribe((data) => {
                this.product = data.product;
                this.getFiles();
              }, 
              (error) => {
                this.sweetAlertService.alertMessage('error',error["message"]);
              });
    }

    getFiles(){
        this.uploadService.getFiles(this.product.id).subscribe((data)=>{
          if(data && data[0] && data[0].path){
            this.relativeImages = data;
            this.relativeImages.forEach((relativeImage)=>{
              relativeImage.path = environment.baseurl + '/' +relativeImage.path
            })
          }
        })
      }
}
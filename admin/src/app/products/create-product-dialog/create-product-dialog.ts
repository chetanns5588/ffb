import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SweetAlertService } from 'src/app/services/sweet-alert/sweet-alert.service';
import { ProductsService } from 'src/app/services/products/products.service';
import { UploadFileService } from 'src/app/services/upload-files/upload-files.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
    selector: 'create-Product-dialog',
    templateUrl: 'create-Product-dialog.html',
    styleUrls: ['create-Product-dialog.scss']
})
export class CreateProductDialog implements OnInit {
    
    products
    productForm: FormGroup;
    
    selectedFiles: FileList;
    currentFileUpload: File;
    progress: { percentage: number } = { percentage: 0 };
  
    constructor(public dialogRef: MatDialogRef<CreateProductDialog>,
        @Inject(MAT_DIALOG_DATA) public data,
        private uploadService: UploadFileService,
        private fb: FormBuilder,
        private sweetAlertService: SweetAlertService, 
        private productsService: ProductsService) {
        this.productForm = this.fb.group({
            material: [''],
            brand: [''],
            price: [''],
            discount: [''],
            mrp: [''],
            style: [''],
            description: ['']
        });
    }
    
    ngOnInit() {
        if(this.data){
            this.productForm.patchValue(this.data);
        }
    }
    
    
    selectFile(event) {
        this.selectedFiles = event.target.files;      
    }

    upload(prodId) {
        this.progress.percentage = 0;
        this.uploadService.pushFilesToStorage(this.selectedFiles,prodId)
        .subscribe(event => {
            if (event.type === HttpEventType.UploadProgress) {
                this.progress.percentage = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
                console.log('File is completely uploaded!');
            }
        });

        this.selectedFiles = undefined;
    }

    onChangeInput(){
        this.productForm.controls['mrp'].setValue(this.productForm.value.price - (this.productForm.value.price * this.productForm.value.discount/100));
    }

    onSubmitProductForm(){
        if(!this.data){
            this.productsService.addProduct(this.productForm.value)
                .subscribe(
                    async (data:any) => {
                        if(data.Products[0].id){
                            await this.upload(data.Products[0].id);
                        }
                    },
                    (error)=>{
                        console.log(error)
                    })
        }
        else{
            this.productsService.updateProduct(this.data.id,this.productForm.value)
                .subscribe(
                    async (data:any) => {
                        if(data && data.Products && data.Products[0].id){
                            await this.upload(data.Products[0].id);
                        }
                    },
                    (error)=>{
                        console.log(error)
                    })
        }
    }
    
}
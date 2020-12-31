import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SweetAlertService } from 'src/app/services/sweet-alert/sweet-alert.service';
import { ProductsService } from 'src/app/services/products/products.service';
import { UploadFileService } from 'src/app/services/upload-files/upload-files.service';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {map, startWith} from 'rxjs/operators';
import { MatChipInputEvent } from '@angular/material/chips';
import { SizeService } from 'src/app/services/size/size.service';

@Component({
    selector: 'create-Product-dialog',
    templateUrl: 'create-Product-dialog.html',
    styleUrls: ['create-Product-dialog.scss']
})
export class CreateProductDialog implements OnInit {
    visible = true;
    selectable = true;
    removable = true;
    separatorKeysCodes: number[] = [ENTER, COMMA];
    sizeCtrl = new FormControl();
    filteredSizes: Observable<string[]>;
    sizes: string[] = ['S','M','L','XL','XXL'];
    allSizes: string[] = [];

    @ViewChild('sizeInput') sizeInput: ElementRef<HTMLInputElement>;
    @ViewChild('auto') matAutocomplete: MatAutocomplete;

    products
    productForm: FormGroup;
    selectedFiles: FileList;

    constructor(public dialogRef: MatDialogRef<CreateProductDialog>,
        @Inject(MAT_DIALOG_DATA) public data,
        private uploadService: UploadFileService,
        private sizeService: SizeService,
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
        if (this.data) {
            this.productForm.patchValue(this.data);
            this.getSizes();
            this.getFiles();
        }
        this.filteredSizes = this.sizeCtrl.valueChanges.pipe(
            startWith(null),
            map((size: string | null) => size ? this._filter(size) : this.allSizes.slice()));
    }

    getSizes() {
        this.sizeService.getSizes(this.data.id).subscribe((sizeData) => {
            this.sizes = [];
            sizeData.forEach((data) => {
                this.sizes.push(data.name);
            })
        })
    }

    getFiles(){
        this.uploadService.getFiles(this.data.id).subscribe((data)=>{
          if(data){
              this.selectedFiles = data;
              console.log("data:",this.selectedFiles)
          }
        })
    }

    add(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;

        // Add our size
        if ((value || '').trim()) {
            this.sizes.push(value.trim());
        }

        // Reset the input value
        if (input) {
            input.value = '';
        }

        this.sizeCtrl.setValue(null);
    }

    remove(size: string): void {
        const index = this.sizes.indexOf(size);

        if (index >= 0) {
            this.sizes.splice(index, 1);
        }
    }

    selected(event: MatAutocompleteSelectedEvent): void {
        this.sizes.push(event.option.viewValue);
        this.sizeInput.nativeElement.value = '';
        this.sizeCtrl.setValue(null);
    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();
        return this.allSizes.filter(size => size.toLowerCase().indexOf(filterValue) === 0);
    }

    selectFile(event) {
        this.selectedFiles = event.target.files;
    }

    upload(prodId) {
        console.log("this.selectedFiles",this.selectedFiles);
        this.uploadService.pushFilesToStorage(this.selectedFiles, prodId)
            .subscribe(
                (data) => {

                }, (error) => {
                    console.log("error", error)
                });
        this.selectedFiles = undefined;
    }

    onChangeInput() {
        this.productForm.controls['mrp'].setValue(this.productForm.value.price - (this.productForm.value.price * this.productForm.value.discount / 100));
    }

    pushSizes(prodId){
        this.sizeService.pushSizesToProduct(this.sizes, prodId)
            .subscribe(
                (data) => {
                }, (error) => {
                    console.log("error", error)
                });
        this.sizes = [];
    }
    
    onSubmitProductForm() {
        if (!this.data) {
            this.productsService.addProduct(this.productForm.value)
                .subscribe(
                    async (data: any) => {
                        if (data.Products[0].id) {
                            await this.upload(data.Products[0].id);
                            await this.pushSizes(data.Products[0].id);
                        }
                    },
                    (error) => {
                        console.log(error)
                    })
        }
        else {
            this.productsService.updateProduct(this.data.id, this.productForm.value)
                .subscribe(
                    async (data: any) => {
                        if (data && data.Products) {
                            await this.upload(this.data.id);
                            await this.pushSizes(this.data.id);
                        }
                    },
                    (error) => {
                        console.log(error)
                    })
        }
    }

}
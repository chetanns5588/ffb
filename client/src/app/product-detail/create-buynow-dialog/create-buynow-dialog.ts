import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'create-buynow-dialog',
    templateUrl: 'create-buynow-dialog.html',
    styleUrls: ['create-buynow-dialog.scss']
})
export class CreateBuynowDialog implements OnInit {
    
    userDetailsForm: FormGroup;
    
    constructor(public dialogRef: MatDialogRef<CreateBuynowDialog>,
        @Inject(MAT_DIALOG_DATA) public data,
        private fb: FormBuilder,) {
        this.userDetailsForm = this.fb.group({
            contact: ['',Validators.required],
            email: ['', [Validators.required, Validators.email]],
            address: ['',Validators.required]
        });
    }
    
    ngOnInit() {
    }
    
    keyPress(event: any) {
        const pattern = /[0-9\+\-\ ]/;
    
        let inputChar = String.fromCharCode(event.charCode);
        if (event.keyCode != 8 && !pattern.test(inputChar)) {
          event.preventDefault();
        }
      }

    onSubmitProductForm() {
        // this.productsService.addProduct(this.productForm.value)
        //     .subscribe(
        //         async (data: any) => {
        //             if (data.Products[0].id) {
        //                 await this.upload(data.Products[0].id);
        //             }
        //         },
        //         (error) => {
        //             console.log(error)
        //         })
    }
    
}
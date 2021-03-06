import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaymentService } from '../services/payment/payment.service';
import { Product } from '../services/products/product.model';
import { ProductsService } from '../services/products/products.service';
import { PurchaseService } from '../services/purchase/purchase.service';
import { SweetAlertService } from '../services/sweet-alert/sweet-alert.service';
import { UploadFileService } from '../services/upload-files/upload-files.service';
import { CreateBuynowDialog } from './create-buynow-dialog/create-buynow-dialog';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { SizeService } from '../services/size/size.service';

declare let Razorpay: any;
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    autoplay: true,
    autoplayTimeout: 3000,
    margin: 10,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false
  }

  prodId: string;
  product: Product;
  imageSrc: string = '';

  sizes = [
    { size: "S", chest: 34, waist: 32, hip: 38 },
    { size: "M", chest: 36, waist: 34, hip: 40 },
    { size: "L", chest: 38, waist: 36, hip: 42 },
    { size: "XL", chest: 40, waist: 38, hip: 44 },
    { size: "XXL", chest: 42, waist: 40, hip: 46 },
    { size: "XXXL", chest: 44, waist: 42, hip: 48 },
  ];
  availableSizes = [];

  defaultSizes = [
    { size: 'S', disabled: true },
    { size: 'M', disabled: true },
    { size: 'L', disabled: true },
    { size: 'XL', disabled: true },
    { size: 'XXL', disabled: true }
  ];

  selectedSize = "";
  products: Product[] = [];
  rzp1;
  newArrival: boolean = false;
  userdata
  relativeImages = [];
  paramsSub: Subscription;
  constructor(private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private productsService: ProductsService,
    private uploadService: UploadFileService,
    private sizeService: SizeService,
    private purchaseService: PurchaseService,
    private paymentService: PaymentService,
    private sweetAlertService: SweetAlertService) {

  }

  ngOnInit(): void {
    this.paramsSub = this.route.params.subscribe(val => {
      this.prodId = val.prodId;
      if (this.prodId) {
        this.getFiles();
        this.getSizes();
        this.productsService.getProduct(this.prodId)
          .subscribe((data) => {
            this.product = data.product;
            if (this.product) {
              this.getRelatedProductsByMaterial();
              this.checkDate();
            }
          },
            (error) => {
              this.sweetAlertService.alertMessage('error', error["message"]);
            });
      }
    });
  }

  onClick(relativeImageSrc) {
    this.imageSrc = relativeImageSrc.path;
  }

  openBuynowDialog(product?: Product) {
    if (!this.selectedSize) {
      alert("Please pick the size");
    }
    else {
      const dialogRef = this.dialog.open(CreateBuynowDialog, {
        width: '50%',
        data: product
      });

      dialogRef.afterClosed().subscribe(userdata => {
        this.userdata = userdata;
        if (this.userdata) {
          this.buyNow();
        }
      });
    }
  }

  buyNow() {
    let purchaseObject = {
      "user_id": "",
      "user_name": "",
      "user_email": "",
      "recipient_name": "",
      "recipient_email": "",
      "amount": this.product.mrp
    }
    this.purchaseService.purchase(purchaseObject)
      .subscribe((data) => {
        if (data) {
          var options = {
            "key": data.key, // Enter the Key ID generated from the Dashboard
            "amount": data.order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": data.order.currency,
            "name": "FFB",
            "description": "",
            "image": "../../assets/images/ffblogo.jpg",
            "order_id": data.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "handler": async (response) => {
              await this.paymentSuccessHandler(response);
            },
            "prefill": {
              "name": "",
              "email": this.userdata.email,
              "contact": this.userdata.contact
            },
            "notes": {
              "address": "Razorpay Corporate Office"
            },
            "theme": {
              "color": "#3399cc"
            }
          };
          var rzp1 = new Razorpay(options);
          rzp1.on('payment.failed', async (response) => {
            await this.paymentFailureHandler(response);
            // alert("Code:"+response.error.code);
            // alert("description:"+response.error.description);
            // alert("source:"+response.error.source);
            // alert("step:"+response.error.step);
            // alert("reason:"+response.error.reason);
            // alert("order_id:"+response.error.metadata.order_id);
            // alert("Code:"+response.error.metadata.payment_id);
          });
          rzp1.open();
        }
      }, (error) => {
        console.log(error);
      });
  }

  paymentSuccessHandler(response) {
    const paymentObject = {
      paymentId: response.razorpay_payment_id,
      orderId: response.razorpay_order_id,
      signature: response.razorpay_signature,
      email: this.userdata.email,
      contact: this.userdata.contact,
      address: this.userdata.address,
      size: this.selectedSize,
      productId: this.prodId,
      paymentStatus: 'Success'
    }
    this.paymentService.payment(paymentObject)
      .subscribe((data) => {
        console.log(data)
      }, (error) => {
        console.log(error);
      })
  }

  paymentFailureHandler(response) {
    const paymentObject = {
      paymentId: response.error.metadata.payment_id,
      orderId: response.error.metadata.order_id,
      signature: '',
      email: this.userdata.email,
      contact: this.userdata.contact,
      address: this.userdata.address,
      size: this.selectedSize,
      productId: this.prodId,
      paymentStatus: 'Failure'
    }
    this.paymentService.payment(paymentObject)
      .subscribe((data) => {
        console.log(data)
      }, (error) => {
        console.log(error);
      })
  }

  getFiles() {
    this.uploadService.getFiles(this.prodId).subscribe((data) => {
      if (data && data[0] && data[0].path) {
        this.relativeImages = data;
        this.relativeImages.forEach((relativeImage) => {
          relativeImage.path = environment.baseurl + '/' + relativeImage.path
        })
        this.imageSrc = data[0].path;
      }
    })
  }

  getSizes() {
    this.sizeService.getSizes(this.prodId).subscribe((sizeData) => {
      sizeData.forEach((data) => {
        this.availableSizes.push(data.name);
      })
      this.defaultSizes.forEach((defaultSize) => {
        this.availableSizes.forEach((availableSize) => {
          if (defaultSize.size === availableSize) {
            defaultSize.disabled = false;
          }
        })
      })
    })

  }

  getRelatedProductsByMaterial() {
    if (this.product.material) {
      this.productsService.getRelatedProductsByMaterial(this.product.material)
        .subscribe(data => {
          this.products = data.Products;
        }, error => {
          this.sweetAlertService.alertMessage('error', error["message"]);
        });
    }
  }

  checkDate() {
    if (this.product) {
      var checkDate = new Date(this.product.updatedAt).toJSON().slice(0, 10);
      var from = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000);
      var to = new Date();
      var check = new Date(checkDate);
      this.newArrival = (check > from && check < to) ? true : false;
    }
  }

  openSnackBar() {
    this._snackBar.open('Payment Success', '', {
      duration: 500,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }

  public ngOnDestroy(): void {
    // Prevent memory leaks
    this.paramsSub.unsubscribe();
  }

}

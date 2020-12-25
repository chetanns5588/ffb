import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from '../models/product.model';
import { CreateProductDialog } from '../products/create-product-dialog/create-product-dialog';
import { PaymentService } from '../services/payment/payment.service';
import { SweetAlertService } from '../services/sweet-alert/sweet-alert.service';
import { ProductDetailDialog } from './product-detail-dialog/product-detail-dialog';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders = [];
  dataSource: MatTableDataSource<Product>;
  editable: boolean[] = [];
  displayedColumns: string[] = [
    'paymentId',
    'orderId',
    'productId',
    'email',
    'contact',
    'address',
    'size',
    'paymentStatus'
  ];
  
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  files = []
  constructor(public dialog: MatDialog,
    private sweetAlertService: SweetAlertService,
    private paymentService: PaymentService) { }

  ngOnInit(): void {
    this.getOrders();
  }
  
  getOrders() {
    this.paymentService.getOrders().subscribe(data => {
      this.orders = data.Payments;
      this.refreshDataSource();
    }, error => {
      this.sweetAlertService.alertMessage('error',error["message"]);
    });

  }

  refreshDataSource() {
    this.dataSource = new MatTableDataSource(this.orders);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  savePaymentId(i,orderId,paymentId){
    this.editable[i] = false;
    this.paymentService.updatePaymentIdByOrderId(orderId,paymentId)
                .subscribe(
                    (data:any) => {
                        this.getOrders();
                    },
                    (error)=>{
                        console.log(error)
                    })
  }

  

  openProductDetailDialog(prodId) {
    const dialogRef = this.dialog.open(ProductDetailDialog, {
      width: '50%',
      data: prodId
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}

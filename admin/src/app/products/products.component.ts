import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SweetAlertService } from '../services/sweet-alert/sweet-alert.service';
import { ProductsService } from '../services/products/products.service';
import swal from "sweetalert2";
import { CreateProductDialog } from './create-product-dialog/create-product-dialog';
import { Product } from '../models/product.model';
import { UploadFileService } from '../services/upload-files/upload-files.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  dataSource: MatTableDataSource<Product>;

  displayedColumns: string[] = ['id','brand','description', 'mrp', 'action'];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  files = []
  constructor(public dialog: MatDialog,
    private uploadService: UploadFileService,
    private sweetAlertService: SweetAlertService,
    private productsService: ProductsService) { }

  ngOnInit(): void {
    this.getProducts();
  }
  
  getProducts() {
    this.productsService.getProducts().subscribe(data => {
      this.products = data.Products;
      this.refreshDataSource();
    }, error => {
      this.sweetAlertService.alertMessage('error',error["message"]);
    });
  }

  refreshDataSource() {
    this.dataSource = new MatTableDataSource(this.products);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  deleteProducts(prodId) {
    swal.fire({
      title: 'Are you sure?',
      text: "You want to delete this Product",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productsService.deleteProduct(prodId)
          .subscribe((data) => {
            this.getProducts();
          }, 
          (error) => {
            this.sweetAlertService.alertMessage('error',error["message"]);
          });
      }
    })
  }

  openCreateProductDialog(product?:Product) {
    const dialogRef = this.dialog.open(CreateProductDialog, {
      width: '50%',
      data: product
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getProducts();
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  updateProducts(product){
    this.openCreateProductDialog(product)
  }
}
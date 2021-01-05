import { Component, Input, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/services/config/config.service';
import { Product } from 'src/app/services/products/product.model';
import { ProductsService } from 'src/app/services/products/products.service';
import { SweetAlertService } from 'src/app/services/sweet-alert/sweet-alert.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  
  @Input('searchedKeyword') searchedKeyword
  
  products: Product[] = [];
  itemsPerPage: number = 8;
  currentPage: number = 1;
  pager: any = {};
  selectedSize = ["S"];
  selectedSort = ["Highly Rated"];
  
  sizes = [
    "S",
    "M",
    "L",
    "XL",
    "XXL"
  ];

  sortings = [
    "Highly Rated",
    "What's New",
    "Popularity",
    "Price Low to High",
    "Price High to Low"
  ];
  
  constructor(private productsService: ProductsService,
    private sweetAlertService: SweetAlertService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productsService.getProducts().subscribe(data => {
      this.products = data.Products;
    }, error => {
      this.sweetAlertService.alertMessage('error',error["message"]);
    });
  }
}

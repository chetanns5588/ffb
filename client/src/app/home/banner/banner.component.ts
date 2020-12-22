import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/services/config/config.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  // banner = {  }
  
  banners = [
    "/assets/images/Banner-1.jpg",
    "/assets/images/Banner-2.jpg",
    "/assets/images/Banner-3.jpg",
    "/assets/images/Banner-4.jpg",
  ]
  constructor(private config : ConfigService) { }

  ngOnInit(): void {
    // this.banner = this.getBanner();
  }

  // getBanner() {
  //   return this.config.getConfig().banner;
  // }
}

import  {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from "../../../services/product.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {ProductType} from "../../../types/product.type";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit, OnDestroy {

  private subscription: Subscription | null = null;

  products: ProductType[] = [];
  showLoader: boolean = false;

  constructor(private productService: ProductService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.showLoader = true;
    this.subscription = this.productService.getProducts()
      .subscribe({
        next: (data: ProductType[]) => {
          this.products = data
          this.showLoader = false;
        },
        error: (error) => {
          this.router.navigate(['/'])
          console.log(error);
        }
      })
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}

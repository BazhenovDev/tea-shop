import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from "../../shared/services/product.service";
import {ProductType} from "../../../types/product.type";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {

  product: ProductType;
  showLoader: boolean = false;
  subscription: Subscription | null = null;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.product = {
      id: 0,
      title: '',
      description: '',
      image: '',
      price: 0,
    }
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.showLoader = true;
        this.subscription = this.productService.getProduct(params['id']).subscribe({
          next: (product: ProductType) => {
            this.showLoader = false;
            this.product = product;
            if (product === null) {
              this.router.navigate(['404']);
            }
          },
          error: error => {
            this.router.navigate(['404']);
            console.log(error);
          }
        })
      }
    })
  }

  clickOnBuyButton(): void {
    this.router.navigate(['/order'], {queryParams: {product: this.product.title}});
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}

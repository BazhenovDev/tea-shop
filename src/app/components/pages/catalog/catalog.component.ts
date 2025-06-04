import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from "../../../services/product.service";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductType} from "../../../types/product.type";
import {SearchService} from "../../../services/search.service";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit, OnDestroy {

  private getProductSubscription: Subscription | null = null;
  private queryParamSubscription: Subscription | null = null;

  private searchSubscription: Subscription  = new Subscription();
  private queryParams: string = ''
  public titlePage: string = 'Наши чайные коллекции'

  public products: ProductType[] = [];
  public showLoader: boolean = false;




  constructor(private productService: ProductService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private searchService: SearchService
  ) {
  }


  //Код через productService
  // ngOnInit(): void {
  //   this.showLoader = true;
  //   this.queryParamSubscription = this.activatedRoute.queryParams.subscribe({
  //     next: params => {
  //       this.showLoader = true;
  //       this.queryParams = params['search']
  //         ? this.queryParams = params['search']
  //         : '';
  //       this.getProductSubscription = this.productService.getProducts(this.queryParams)
  //         .subscribe({
  //           next: (data: ProductType[]) => {
  //             this.products = data
  //
  //             this.products.length === 0
  //               ? this.titlePage = 'Ничего не найдено'
  //               : this.queryParams
  //                 ? this.titlePage = `Результаты поиска по запросу: "${this.queryParams}"`
  //                 : this.titlePage = 'Наши чайные коллекции'
  //
  //             this.showLoader = false;
  //           },
  //           error: (error) => {
  //             this.router.navigate(['/'])
  //             console.log(error);
  //           }
  //         })
  //     }
  //   })
  // }


  // Код с Subject
  ngOnInit(): void {
    this.showLoader = true;
    this.searchSubscription.add(
      this.searchService.getProductsSubject
        .subscribe({
          next: (params: string) => {
            this.queryParams = params || '';
            this.loadProducts();
          },
          error: err => {
            this.router.navigate(['']);
            console.error(`ОШИБКА: ${err}`);
          }
        })
    )
    this.loadProducts();
  }

  loadProducts(): void {
    this.showLoader = true;
    this.searchSubscription.add(
      this.productService.getProducts(this.queryParams).subscribe({
        next: (data: ProductType[]) => {
          this.products = data;
          this.updateTitle()
          this.showLoader = false;
        },
        error: err => {
          console.error(`ОШИБКА: ${err}`);
          this.showLoader = false;
          this.router.navigate(['/']);
        }
      })
    )
  }

  updateTitle(): void {
    if (this.products.length === 0) {
      this.titlePage = 'Ничего не найдено'
    } else if (this.queryParams) {
      this.titlePage = `Результаты поиска по запросу: "${this.queryParams}"`
    } else {
      this.titlePage = 'Наши чайные коллекции'
    }
  }

  ngOnDestroy(): void {
    this.getProductSubscription?.unsubscribe();
    this.queryParamSubscription?.unsubscribe();

    this.searchSubscription?.unsubscribe();
  }

}

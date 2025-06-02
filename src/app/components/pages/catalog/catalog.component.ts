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

  private searchSubscription: Subscription | null = null;
  private queryParams: string = ''
  public titlePage: string = 'Наши чайные коллекции'

  products: ProductType[] = [];
  showLoader: boolean = false;


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

    this.getProductSubscription = this.productService.getProducts('').subscribe({
      next: data => {
        this.products = data;
        this.showLoader = false;
      }
    })

    this.searchSubscription = this.searchService.getProductsSubject.subscribe({
        next: params => {
          this.showLoader = true;
          this.queryParams = params ? params : '';
          this.getProductSubscription = this.productService.getProducts(this.queryParams)
            .subscribe({
              next: data => {
                this.products = data

                this.products.length === 0
                  ? this.titlePage = 'Ничего не найдено'
                  : this.queryParams
                    ? this.titlePage = `Результаты поиска по запросу: "${this.queryParams}"`
                    : this.titlePage = 'Наши чайные коллекции'

                this.showLoader = false;
              }, error: (error) => {
                this.router.navigate(['/'])
                console.log(error);
              }
            })
        }
      }
    )

  }

  ngOnDestroy(): void {
    this.getProductSubscription?.unsubscribe();
    this.queryParamSubscription?.unsubscribe();

    this.searchSubscription?.unsubscribe();
  }

}

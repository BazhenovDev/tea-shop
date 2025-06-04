import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProductType} from "../types/product.type";

@Injectable()
export class ProductService {

  constructor(private http: HttpClient) {
  }

  getProducts(queryParams: string): Observable<ProductType[]> {
    const url: string = 'https://testologia.ru/tea';
    return queryParams
      ? this.http.get<ProductType[]>(`${url}?search=${queryParams}`)
      : this.http.get<ProductType[]>(url);
  }

  getProduct(id: number): Observable<ProductType> {
    return this.http.get<ProductType>(`https://testologia.ru/tea?id=${id}`);
  }
}

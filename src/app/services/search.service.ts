import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  public getProductsSubject: Subject<string> = new Subject<string>();

  private queryParams: string = '';

  constructor() {
  }

  updateSearch(params: string) {
    params
      ? this.queryParams = params
      : this.queryParams = '';
    this.getProductsSubject.next(this.queryParams);
  }

  getSearch() {
    return this.queryParams;
  }

}

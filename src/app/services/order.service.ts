import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormType} from "../types/form.type";

@Injectable()
export class OrderService {

  constructor(private http: HttpClient) { }

  sendOrder(body: FormType) {
    return this.http.post<{ success: number, message?: string }>('https://testologia.ru/order-tea', body)
  }

}

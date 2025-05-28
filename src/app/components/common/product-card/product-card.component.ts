import {Component, Input, OnInit} from '@angular/core';
import {ProductType} from "../../../types/product.type";

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input() product: ProductType;

  constructor() {
    this.product = {
      id: 0,
      title: '',
      description: '',
      image: '',
      price: 0
    }
  }

  ngOnInit(): void {
  }

}

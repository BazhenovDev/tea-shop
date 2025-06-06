import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {LoaderComponent} from "./components/loader/loader.component";
import {ProductCardComponent} from "./components/product-card/product-card.component";

@NgModule({
  declarations: [
    LoaderComponent,
    ProductCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    LoaderComponent,
    ProductCardComponent
  ]
})
export class SharedModule { }

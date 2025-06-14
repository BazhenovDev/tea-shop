import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogRoutingModule } from './catalog-routing.module';
import {CatalogComponent} from "./catalog.component";
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [
    CatalogComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    CatalogRoutingModule,
  ],
  exports: [
    CatalogRoutingModule
  ]
})
export class CatalogModule { }

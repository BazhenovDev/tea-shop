import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/common/header/header.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { MainComponent } from './components/pages/main/main.component';
import { CatalogComponent } from './components/pages/catalog/catalog.component';
import { ProductComponent } from './components/pages/product/product.component';
import { OrderComponent } from './components/pages/order/order.component';
import {CommonModule} from "@angular/common";
import {ProductService} from "./services/product.service";
import {HttpClientModule} from "@angular/common/http";
import { ProductCardComponent } from './components/common/product-card/product-card.component';
import { NotFoundComponent } from './components/common/not-found/not-found.component';
import { AccordionComponent } from './components/common/accordion/accordion.component';
import { SliderComponent } from './components/common/slider/slider.component';
import {ReactiveFormsModule} from "@angular/forms";
import { LoaderComponent } from './components/common/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    CatalogComponent,
    ProductComponent,
    OrderComponent,
    ProductCardComponent,
    NotFoundComponent,
    AccordionComponent,
    SliderComponent,
    LoaderComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
    ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }

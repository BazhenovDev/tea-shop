import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import {SharedModule} from "../../shared/shared.module";
import {AccordionComponent} from "./accordion/accordion.component";
import {SliderComponent} from "./slider/slider.component";
import {MainComponent} from "./main/main.component";
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    MainComponent,
    AccordionComponent,
    SliderComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    MainRoutingModule
  ],
  exports: [
    MainRoutingModule
  ]
})
export class MainModule { }

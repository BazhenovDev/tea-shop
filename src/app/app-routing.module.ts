import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LayoutComponent} from "./views/layout.component";
import {NotFoundComponent} from "./views/not-found/not-found.component";

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', loadChildren: () => import('./views/main/main.module').then(m => m.MainModule) },
      { path: '404', loadChildren: () => import('./views/not-found/not-found.module').then(m => m.NotFoundModule) },
      { path: 'order', loadChildren: () => import('./views/order/order.module').then(m => m.OrderModule) },
      { path: 'catalog', loadChildren: () => import('./views/catalog/catalog.module').then(m => m.CatalogModule) },
      { path: 'catalog', loadChildren: () => import('./views/product/product.module').then(m => m.ProductModule) },
    ]
  },
  {path: '**', redirectTo: '404'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

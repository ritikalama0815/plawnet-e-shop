import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Home } from './home/home';
import { LayoutModule } from './layout/layout-module';
import { HomePage } from './home-page/home-page';
import { Shop } from './shop/shop';
import { Stores } from './stores/stores';
import { Account } from './account/account';
import { ProductPage } from './product/product';
import { CartPage } from './cart/cart';
import { FavoritesPage } from './favorites/favorites';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CarouselModule as OwlCarousel } from 'ngx-owl-carousel-o';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from './shared/shared-module';

@NgModule({
  declarations: [App, Home, HomePage, Shop, Stores, Account, ProductPage, CartPage, FavoritesPage],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    SharedModule,
    CarouselModule,
    OwlCarousel,
    MatCardModule,
    MatIconModule,
  ],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}

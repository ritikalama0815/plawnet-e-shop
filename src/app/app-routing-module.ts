import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './home/home';
import { HomePage } from './home-page/home-page';
import { Shop } from './shop/shop';
import { Stores } from './stores/stores';
import { Account } from './account/account';
import { ProductPage } from './product/product';
import { CartPage } from './cart/cart';
import { FavoritesPage } from './favorites/favorites';

const routes: Routes = [
  {
    path: '',
    component: Home,
    children: [
      { path: '', component: HomePage },
      { path: 'shop', component: Shop },
      { path: 'shop/:category', component: Shop },
      { path: 'product/:id', component: ProductPage },
      { path: 'cart', component: CartPage },
      { path: 'favorites', component: FavoritesPage },
      { path: 'stores', component: Stores },
      { path: 'account', component: Account },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ProductCard } from './product-card/product-card';

@NgModule({
  declarations: [ProductCard],
  imports: [CommonModule, RouterModule, MatIconModule],
  exports: [ProductCard],
})
export class SharedModule {}

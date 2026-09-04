import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [Header, Footer],
  imports: [CommonModule, RouterModule, MatIconModule],
  exports: [Header, Footer],
})
export class LayoutModule {}

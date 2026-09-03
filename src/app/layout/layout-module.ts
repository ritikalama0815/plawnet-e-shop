import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [Header, Footer],
  imports: [CommonModule, MatIconModule],
  exports:[
    Header, Footer
  ]
})
export class LayoutModule {}

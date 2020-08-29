import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SidebardComponent } from './sidebard/sidebard.component';


@NgModule({
  declarations: [
    BreadcrumbsComponent,
    SidebardComponent,
    HeaderComponent,
    FooterComponent,
  ],
  exports: [
    BreadcrumbsComponent,
    SidebardComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ]
})
export class SharedModule { }

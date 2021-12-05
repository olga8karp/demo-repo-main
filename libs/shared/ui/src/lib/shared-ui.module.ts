import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  imports: [CommonModule, ButtonModule],
  declarations: [PageNotFoundComponent],
  exports: [PageNotFoundComponent],
})
export class SharedUiModule {}

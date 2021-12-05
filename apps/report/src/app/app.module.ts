import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedCoreApiModule } from '@demo-repo/shared/core-api';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('@demo-repo/client-report/views').then(m => m.ClientReportViewsModule),
  },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes, { initialNavigation: 'enabled' }),
    SharedCoreApiModule.forRoot(),
    HttpClientModule,
    RouterModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

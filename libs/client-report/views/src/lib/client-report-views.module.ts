import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { ClientReportUiModule } from '@demo-repo/client-report/ui';
import { ReactiveComponentModule } from '@ngrx/component';
import { PageNotFoundComponent } from '@demo-repo/shared/ui';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientEditDetailsComponent } from './client-edit-details/client-edit-details.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

export const clientReportViewsRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'client-list',
    pathMatch: 'full',
  },
  {
    path: 'client-list',
    component: ClientListComponent,
  },
  {
    path: 'client-report',
    children: [
      {
        path: '',
        redirectTo: 'edit-client',
        pathMatch: 'full',
      },
      {
        path: 'edit-client',
        component: ClientEditDetailsComponent,
      },
    ],
  },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent },
];

export const routerModule = RouterModule.forChild(clientReportViewsRoutes);

const externalUiModules = [DialogModule, ButtonModule];

@NgModule({
  imports: [CommonModule, routerModule, ClientReportUiModule, ...externalUiModules, ReactiveComponentModule],
  declarations: [ClientEditDetailsComponent, ClientListComponent],
})
export class ClientReportViewsModule {}

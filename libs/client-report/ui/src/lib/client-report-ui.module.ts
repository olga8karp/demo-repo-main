import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { ClientEditDetailsFormComponent } from './client-edit-details-form/client-edit-details-form.component';
import { ClientListTableComponent } from './client-list-table/client-list-table.component';

const externalUiModules = [CalendarModule, DropdownModule, InputTextModule, TableModule];

@NgModule({
  imports: [CommonModule, ...externalUiModules, ReactiveFormsModule, ReactiveFormsModule, ReactiveFormsModule],
  declarations: [ClientEditDetailsFormComponent, ClientListTableComponent],
  exports: [ClientEditDetailsFormComponent, ClientListTableComponent],
})
export class ClientReportUiModule {}

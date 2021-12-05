import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Client } from '@demo-repo/shared/core-api';
import { SmartTableColumn, tableHeaders } from '../model/smart-table-column';

@Component({
  selector: 'demo-repo-client-list-table',
  templateUrl: './client-list-table.component.html',
  styleUrls: ['./client-list-table.component.scss'],
})
export class ClientListTableComponent {
  /**
   * Client list
   */
  @Input() clientList: Client[] = [];

  /**
   * Navigate to edit client details
   */
  @Output() editDetails = new EventEmitter<string>();

  /**
   * Smart table columns model
   */
  columns: SmartTableColumn[] = tableHeaders;

  /**
   * Check if column displays Edit button
   */
  isActionColumn({ field }: SmartTableColumn): boolean {
    return field === 'action';
  }

  /**
   * Navigate to edit client details
   */
  navigateToEdit(index: number): void {
    const clientId = this.clientList[index]._id;
    this.editDetails.emit(clientId);
  }
}

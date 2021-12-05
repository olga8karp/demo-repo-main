import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientDataService } from '@demo-repo/shared/core-api';

@Component({
  selector: 'demo-repo-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientListComponent {
  /**
   * Stream with client list
   */
  clientList$ = this.clientService.getClientList();

  constructor(private readonly clientService: ClientDataService, private router: Router) {}

  /**
   * Navigate to edit client details
   */
  navigateToEdit(clientId: string): void {
    this.router.navigate(['client-report/edit-client', { clientId }]);
  }
}

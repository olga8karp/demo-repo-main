import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { distinctUntilChanged, switchMap, takeUntil } from 'rxjs/operators';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { Client, ClientDataService } from '@demo-repo/shared/core-api';
import { ClientEditDetailsFormComponent } from '@demo-repo/client-report/ui';

@Component({
  selector: 'demo-repo-client-edit-details',
  templateUrl: './client-edit-details.component.html',
  styleUrls: ['./client-edit-details.component.scss'],
})
export class ClientEditDetailsComponent implements OnInit {
  /**
   * Edit client details form component
   */
  @ViewChild(ClientEditDetailsFormComponent) formComponent!: ClientEditDetailsFormComponent;

  private readonly clientData$$ = new BehaviorSubject<Client | undefined>(undefined);

  /**
   * Client data
   */
  clientData$: Observable<Client | undefined> = this.clientData$$.pipe(distinctUntilChanged());

  /**
   * EDit client details form
   */
  successModalOpened = false;

  private readonly destroy$$ = new Subject<void>();
  constructor(
    private readonly route: ActivatedRoute,
    private router: Router,
    private readonly dataService: ClientDataService,
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        switchMap(({ clientId }: Params) => (clientId ? this.dataService.getClientInfo(clientId) : of(undefined))),
        takeUntil(this.destroy$$),
      )
      .subscribe((clientData: Client | undefined) => {
        this.clientData$$.next(clientData);
      });
  }

  /**
   * Navigate to client list
   */
  navigateToClientList(): void {
    this.router.navigate(['']);
  }

  /**
   * Open submit success modal
   */
  openSubmitSuccessModal(): void {
    if (this.formComponent.form.valid) {
      this.successModalOpened = true;
    }
  }

  ngOnDestroy() {
    this.destroy$$.next();
  }
}

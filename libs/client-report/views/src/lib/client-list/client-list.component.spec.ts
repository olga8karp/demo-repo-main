import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientListComponent } from './client-list.component';
import { ClientDataService } from '@demo-repo/shared/core-api';
import { ChangeDetectorRef } from '@angular/core';
import { ClientReportUiModule } from '@demo-repo/client-report/ui';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { ReactiveComponentModule } from '@ngrx/component';

describe('ListClientsComponent', () => {
  let component: ClientListComponent;
  let fixture: ComponentFixture<ClientListComponent>;
  let clientService: ClientDataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ClientReportUiModule, ReactiveComponentModule],
      declarations: [ClientListComponent],
      providers: [
        ChangeDetectorRef,
        {
          provide: ClientDataService,
          useValue: {
            getClientList: () => of([]),
          },
        },
        {
          provide: Router,
          useValue: {
            navigate: () => null,
          },
        },
      ],
    }).compileComponents();

    clientService = TestBed.inject(ClientDataService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

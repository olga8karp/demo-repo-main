import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientEditDetailsComponent } from './client-edit-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { ClientDataService } from '@demo-repo/shared/core-api';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ReactiveComponentModule } from '@ngrx/component';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'demo-repo-client-edit-details-form',
  template: '<p> Mock component </p>',
})
class MockProductEditorComponent {
  @Input() clientData: any;
}

describe('ClientListTableComponent', () => {
  let component: ClientEditDetailsComponent;
  let fixture: ComponentFixture<ClientEditDetailsComponent>;
  const mockRouter = { navigate: jest.fn().mockImplementation(() => null) };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientEditDetailsComponent, MockProductEditorComponent],
      imports: [DialogModule, ButtonModule, BrowserAnimationsModule, ReactiveComponentModule],
      providers: [
        {
          provide: ClientDataService,
          useValue: {
            getClientList: () => of([]),
          },
        },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ get: (key: string) => 'value' }),
          },
        },
        {
          provide: Router,
          useValue: mockRouter,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientEditDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should navigate to list on Cancel button click', () => {
    fixture.debugElement.query(By.css('[data-role="cancel"]')).triggerEventHandler('click', undefined);

    expect(mockRouter.navigate).toHaveBeenCalledWith(['']);
  });

  it('should display success notification on valid form submission', () => {
    component.formComponent = { form: { valid: true } } as any;
    fixture.debugElement.query(By.css('[data-role="submit"]')).triggerEventHandler('click', undefined);
    fixture.detectChanges();
    const dialog = fixture.debugElement.query(By.css('[role="dialog"]'));

    expect(dialog).toBeTruthy();
  });

  it('should not display success notification on invalid form submission', () => {
    component.formComponent = { form: { valid: false } } as any;
    fixture.debugElement.query(By.css('[data-role="submit"]')).triggerEventHandler('click', undefined);
    fixture.detectChanges();
    const dialog = fixture.debugElement.query(By.css('[role="dialog"]'));

    expect(dialog).toBe(null);
  });
});

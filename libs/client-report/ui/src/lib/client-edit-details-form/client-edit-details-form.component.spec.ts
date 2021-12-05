import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { mockProvider } from '@ngneat/spectator';
import { of } from 'rxjs';
import { Client, ValidationDataService } from '@demo-repo/shared/core-api';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ClientEditDetailsFormComponent } from './client-edit-details-form.component';

const clientDetailsMock = {
  name: 'Pearson Myers',
  gender: 'male',
  birthDate: '03/05/1987',
  email: 'pearsonmyers@biolive.com',
  city: 'Allentown',
  country: 'Samoa',
  houseNr: 123,
  addition: 'C',
  postCode: '6509 CZ',
  iban: 'NL77RABO2683542178',
};

@Component({
  template: ` <demo-repo-client-edit-details-form [clientData]="clientData"> </demo-repo-client-edit-details-form> `,
})
class TestHostComponent {
  clientData: Partial<Client> | undefined;
}

describe('ClientListTableComponent', () => {
  let hostComponent: TestHostComponent;
  let component: DebugElement;
  let fixture: ComponentFixture<TestHostComponent>;

  const query = {
    form: () => component.componentInstance.form,
    nameControl: () => query.form().controls.name,
    genderControl: () => query.form().controls.gender,
    birthDateControl: () => query.form().controls.birthDate,
    ibanControl: () => query.form().controls.iban,
    emailControl: () => query.form().controls.email,
    postCodeControl: () => query.form().controls.postCode,
    houseNumberControl: () => query.form().controls.houseNr,
    additionControl: () => query.form().controls.addition,
    cityControl: () => query.form().controls.city,
    countryControl: () => query.form().controls.country,
  };

  const validationDataServiceMock = { validateIBAN: (iban: string) => of({ status: 200 }) };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientEditDetailsFormComponent, TestHostComponent],
      imports: [CalendarModule, DropdownModule, InputTextModule, ReactiveFormsModule],
      providers: [Router, FormBuilder, mockProvider(ValidationDataService, validationDataServiceMock)],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    component = fixture.debugElement.query(By.directive(ClientEditDetailsFormComponent));
    fixture.detectChanges();
  });

  it('should render correct count of input elements', () => {
    const formElement = fixture.debugElement.nativeElement.querySelector('#edit-client-details-form');
    const inputElements = formElement.querySelectorAll('input');

    expect(inputElements.length).toBe(10);
  });

  describe('form with empty input values', () => {
    it('should be invalid', () => {
      expect(query.form().valid).toBe(false);
    });
  });

  describe('form populated with correct values', () => {
    beforeEach(() => {
      hostComponent.clientData = clientDetailsMock;
      fixture.detectChanges();
    });

    it('should have correct input values', () => {
      const formValue = component.componentInstance.form.value;

      expect(formValue).toEqual(clientDetailsMock);
    });

    it('should be valid', () => {
      expect(query.form().valid).toBe(true);
    });
  });

  describe('name input', () => {
    it('should be invalid if empty string value provided', () => {
      query.nameControl().setValue('');

      expect(query.nameControl().valid).toBe(false);
    });

    it('should be valid if at least one letter input value provided', () => {
      query.nameControl().setValue('a');

      expect(query.nameControl().valid).toBe(true);
    });

    it('should be valid if multiple letters input value provided', () => {
      query.nameControl().setValue('a');

      expect(query.nameControl().valid).toBe(true);
    });
  });

  describe('gender input', () => {
    it('should be invalid if empty string value provided', () => {
      query.genderControl().setValue('');

      expect(query.genderControl().valid).toBe(false);
    });

    it('should be valid if "female" input value provided', () => {
      query.genderControl().setValue('female');

      expect(query.genderControl().valid).toBe(true);
    });
  });

  describe('birth date input', () => {
    it('should be invalid if empty string value provided', () => {
      query.birthDateControl().setValue('');

      expect(query.birthDateControl().valid).toBe(false);
    });

    it('should be valid if past date input value provided', () => {
      query.birthDateControl().setValue('01/01/2001');

      expect(query.birthDateControl().valid).toBe(true);
    });

    it('should be valid if yesterday input value provided', () => {
      query.birthDateControl().setValue(new Date(new Date().getDate() - 1));

      expect(query.birthDateControl().valid).toBe(true);
    });

    //TODO it('should be valid if future input value provided', () => {});
  });

  describe('iban input', () => {
    it('should be invalid if empty string value provided', () => {
      query.ibanControl().setValue('');

      expect(query.ibanControl().valid).toBe(false);
    });

    it('should be valid if iban validator returns success', () => {
      query.ibanControl().setValue('DE75512108001245126199');

      expect(query.ibanControl().valid).toBe(true);
    });

    //TODO it('should be invalid if iban validator returns error', () => {});
  });

  describe('email input', () => {
    it('should be invalid if empty string value provided', () => {
      query.emailControl().setValue('');

      expect(query.emailControl().valid).toBe(false);
    });

    it('should be valid if valid email input value provided', () => {
      query.emailControl().setValue('xxx@gmail.com');

      expect(query.emailControl().valid).toBe(true);
    });

    it('should be invalid if invalid email input value provided', () => {
      query.emailControl().setValue('xxx');

      expect(query.emailControl().valid).toBe(false);
    });
  });

  describe('post code input', () => {
    it('should be invalid if empty string value provided', () => {
      query.postCodeControl().setValue('');

      expect(query.postCodeControl().valid).toBe(false);
    });

    it('should be valid if valid post code input value provided', () => {
      query.postCodeControl().setValue('6509 CZ');

      expect(query.postCodeControl().valid).toBe(true);
    });

    it('should be invalid if invalid post code input value provided', () => {
      query.postCodeControl().setValue('6509');

      expect(query.postCodeControl().valid).toBe(false);
    });
  });

  describe('house number input', () => {
    it('should be invalid if empty string input value provided', () => {
      query.houseNumberControl().setValue('');

      expect(query.houseNumberControl().valid).toBe(false);
    });

    it('should be valid if positive number input value provided', () => {
      query.houseNumberControl().setValue('62');

      expect(query.houseNumberControl().valid).toBe(true);
    });

    it('should be invalid if negative number input value provided', () => {
      query.houseNumberControl().setValue('-1');

      expect(query.houseNumberControl().valid).toBe(false);
    });
  });

  describe('addition input', () => {
    it('should be invalid if empty string input value provided', () => {
      query.additionControl().setValue('');

      expect(query.additionControl().valid).toBe(false);
    });

    it('should be valid if any string input value provided', () => {
      query.additionControl().setValue('a');

      expect(query.additionControl().valid).toBe(true);
    });
  });

  describe('city input', () => {
    it('should be invalid if empty string input value provided', () => {
      query.cityControl().setValue('');

      expect(query.cityControl().valid).toBe(false);
    });

    it('should be valid if any string input value provided', () => {
      query.cityControl().setValue('a');

      expect(query.cityControl().valid).toBe(true);
    });

    describe('country input', () => {
      it('should be invalid if empty string value provided', () => {
        query.countryControl().setValue('');

        expect(query.countryControl().valid).toBe(false);
      });

      it('should be valid if "Netherlands" input value provided', () => {
        query.countryControl().setValue('Netherlands');

        expect(query.countryControl().valid).toBe(true);
      });
    });
  });
});

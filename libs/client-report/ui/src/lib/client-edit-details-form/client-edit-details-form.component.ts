import { Component, Input } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Client, countriesList, ValidationDataService } from '@demo-repo/shared/core-api';

@Component({
  selector: 'demo-repo-client-edit-details-form',
  templateUrl: './client-edit-details-form.component.html',
  styleUrls: ['./client-edit-details-form.component.scss'],
})
export class ClientEditDetailsFormComponent {
  /**
   * Client data
   */
  @Input() set clientData(clientData: Client | undefined) {
    this.patchClientDetailsForm(clientData);
  }

  /**
   * Edit client details form
   */
  form = this.buildClientDetailsForm();

  /**
   * List of countries
   */
  countriesList = countriesList;

  constructor(private formBuilder: FormBuilder, private validationDataService: ValidationDataService) {}

  /**
   * Get today's date
   */
  getTodayDate(): Date {
    return new Date();
  }

  private buildClientDetailsForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', { updateOn: 'blur', validators: [Validators.required] }],
      gender: ['', { updateOn: 'blur', validators: [Validators.required] }],
      birthDate: ['', { updateOn: 'blur', validators: [Validators.required] }],
      iban: ['', { updateOn: 'blur', validators: [Validators.required], asyncValidators: [this.ibanAsyncValidator()] }],
      email: ['', { updateOn: 'blur', validators: [Validators.required, Validators.email] }],
      postCode: [
        '',
        { updateOn: 'blur', validators: [Validators.required, Validators.pattern(/(\d{4})\s([a-zA-Z]{2})/)] },
      ],
      houseNr: ['', { updateOn: 'blur', validators: [Validators.required, Validators.min(1)] }],
      addition: ['', { updateOn: 'blur', validators: [Validators.required] }],
      city: ['', { updateOn: 'blur', validators: [Validators.required] }],
      country: ['', { updateOn: 'blur', validators: [Validators.required] }],
    });
  }

  private patchClientDetailsForm(clientData: Client | undefined): void {
    this.form.patchValue({ ...clientData });
  }

  private ibanAsyncValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.validationDataService.validateIBAN(control.value).pipe(
        map(() => {
          return null;
        }),
        catchError(error => {
          return of(error.status === 400 ? { invalidIban: true } : null);
        }),
      );
    };
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_KEY = '0c16e3c95392520210ba6bc837d112c999f53ea8';
const BASE_URL = '/api/v1/validate-basic';

@Injectable({
  providedIn: 'root',
})
export class ValidationDataService {
  constructor(private http: HttpClient) {}

  validateIBAN(iban: string): Observable<HttpResponse<any>> {
    const params = new HttpParams().append('api_key', API_KEY);

    return this.http.get<any>(`${BASE_URL}/${iban}`, { params });
  }
}

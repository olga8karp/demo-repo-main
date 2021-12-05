import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Client } from '../model/client';

@Injectable({
  providedIn: 'root',
})
export class ClientDataService {
  constructor(private http: HttpClient) {}

  /**
   * Get the list of clients
   */
  getClientList(): Observable<Client[]> {
    return this.http
      .get<Client[]>('../assets/clients-large.json')
      .pipe(map((response: Client[] | undefined) => (Array.isArray(response) ? this.adjustAddress(response) : [])));
  }

  /**
   * Get client details by id
   */
  getClientInfo(clientId: string): Observable<Client | undefined> {
    return this.getClientList().pipe(
      map((response: Client[] | undefined) => response?.find((clientData: Client) => clientData._id === clientId)),
    );
  }

  /**
   * Update client details
   */
  updateClientInfo(clientData: Client): Observable<Client | undefined> {
    return this.http.put<Client>('', clientData);
  }

  private adjustAddress(responseClientList: Client[]): Client[] {
    responseClientList.forEach((client: Client) => {
      const postCodeDigits = client.postCode.match(/\d+/g);

      client.address = `${client.houseNr} ${client.street}, ${client.city}, ${client.country}, ${postCodeDigits}`;
    });

    return responseClientList;
  }
}

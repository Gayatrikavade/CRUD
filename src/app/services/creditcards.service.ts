import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Creditcard } from '../models/creditcard';

@Injectable({
  providedIn: 'root'
})
export class CreditcardsService {

  constructor(private httpclient:HttpClient) { }

  private apiUrl="http://localhost:3000/creditcards";

  createCreditCard(creditcard:Creditcard):Observable<Creditcard>
  {
    return this.httpclient.post<Creditcard>(this.apiUrl,creditcard);
  }

  getCreditCard():Observable<Creditcard[]>
  {
    return this.httpclient.get<Creditcard[]>(this.apiUrl);
  }

  getCreditCardById(id:Number):Observable<Creditcard>
  {
    const url=`${this.apiUrl}/${id}`;
    return this.httpclient.get<Creditcard>(url);
  }

  updateCreditCard(creditcard :Creditcard):Observable<Creditcard>
  {
    const url=`${this.apiUrl}/${creditcard.id}`;
    return this.httpclient.put<Creditcard>(url,creditcard);
  }

  deleteCreditCard(id:Number):Observable<void>
  {
    const url=`${this.apiUrl}/${id}`;
    return this.httpclient.delete<void>(url);
  }
}

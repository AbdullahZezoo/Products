import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProdserviceService {
  myAppUrl: string;
  myApiUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };
  constructor(private _http: HttpClient,  @Inject('BASE_URL') baseUrl: string) {
      this.myAppUrl = baseUrl;
      this.myApiUrl = 'api/Products/';
  }
  
    getProduct(): Observable<Product[]> {  
      return this._http.get<Product[]>(this.myAppUrl + this.myApiUrl)
      .pipe(
        retry(1)
      );
    } 
    
    addProduct(product): Observable<Product>{
      return this._http.post<Product>(this.myAppUrl + this.myApiUrl, JSON.stringify(product), this.httpOptions)
      .pipe(
        retry(1)
      ) 
    }

    getProductId(productId: number): Observable<Product>{
      return this._http.get<Product>(this.myAppUrl + this.myApiUrl + productId)
      .pipe(
        retry(1)
      )
    }


    editProduct(productId: number, product): Observable<Product>{
      return this._http.put<Product>(this.myAppUrl + this.myApiUrl + productId, JSON.stringify(product), this.httpOptions)
      .pipe(
        retry(1)
      )
    }

    deleteProduct(productId: number): Observable<Product>{
      return this._http.delete<Product>(this.myAppUrl + this.myApiUrl + productId)
      .pipe(
        retry(1)
      )
    }


  
   
}


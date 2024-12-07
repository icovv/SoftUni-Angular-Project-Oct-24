import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cars } from '../types/cars';
import { empty } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type' : 'application/json'
  })

  constructor(private http: HttpClient) { }

  getAllCars(){
    return this.http.get<Cars[]>('api/data/cars',{headers:this.headers})
  }

}

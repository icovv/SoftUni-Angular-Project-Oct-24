import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cars } from '../types/cars';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getAllCars(){
    return this.http.get<Cars[]>('api/data/cars')
  }
}

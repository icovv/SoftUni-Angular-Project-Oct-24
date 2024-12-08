import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cars } from '../types/cars';
import { empty, Observable, switchMap } from 'rxjs';

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

  getSingleCar(carID:string){
    return this.http.get<Cars>(`api/data/cars/${carID}`, {headers:this.headers});
  }

  addLikesToCar(carID:string, userID: string){
    let newHeader = this.headers.append("X-Admin",'');
    return this.getSingleCar(carID).pipe(switchMap((data) => {
        data.likes.push(userID);
        return this.http.put<Cars>(`api/data/cars/${carID}`,data,{headers:newHeader})
      })
    )
    }
  removeLikesToCar(carID:string, userID: string){
    let newHeader = this.headers.append("X-Admin",'');
    return this.getSingleCar(carID).pipe(switchMap((data) => {
        let newData = data.likes.filter((item) => item != userID)
        data.likes = newData
        return this.http.put<Cars>(`api/data/cars/${carID}`,data,{headers:newHeader})
      })
    )
    }
    deleteCar(carID:string){
      let userData:string= localStorage.getItem('userData')!;
      let userToken= JSON.parse(userData).accessToken;
      let newHeader = this.headers.append('X-Authorization',`${userToken}`);
      return this.http.delete<Cars>(`api/data/cars/${carID}`,{headers:newHeader});
    }
    createCar(data:Cars){
      let userData:string= localStorage.getItem('userData')!;
      let userToken= JSON.parse(userData).accessToken;
      let newHeader = this.headers.append('X-Authorization',`${userToken}`);
      return this.http.post<Cars>('api/data/cars',data,{headers:newHeader});
    }
    editCar(carID:string, car:Cars){
      let userData:string= localStorage.getItem('userData')!;
      let userToken= JSON.parse(userData).accessToken;
      let newHeader = this.headers.append('X-Authorization',`${userToken}`);
      return this.getSingleCar(carID).pipe(switchMap((data) => {
          return this.http.put<Cars>(`api/data/cars/${carID}`,car,{headers:newHeader})
        })
      )
      }
  }

import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription, tap } from 'rxjs';
import { User, UserForApi } from '../types/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user$$ = new BehaviorSubject<UserForApi | null>(null);
  public user$ = this.user$$.asObservable();


  user: UserForApi | null = null; 
  userSubscription: Subscription | null = null

  get isLogged(): boolean {
    console.log (this.user);
    return !!this.user;
  }

  constructor(private http: HttpClient) { 
    this.userSubscription = this.user$.subscribe({
      next:(user) => {
        this.user = user;}
    })
  }

  login(email:string, password:string | number){
    return this.http.post<UserForApi>('api/users/login', {email,password}).pipe(tap((user) => this.user$$.next(user)));
  }
  register(email:string, password:string | number){
    return this.http.post<UserForApi>('api/users/register', {email,password}).pipe(tap((user) => this.user$$.next(user)));
  }

}

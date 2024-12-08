import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription, tap } from 'rxjs';
import { User, UserForApi } from '../types/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy {
  private user$$ = new BehaviorSubject<UserForApi | null>(null);
  public user$ = this.user$$.asObservable();

  user: UserForApi | null = null; 
  userSubscription: Subscription | null = null


  headers: HttpHeaders = new HttpHeaders({
    'Content-Type' : 'application/json'
  })

  get isLogged(): boolean {
    return !!this.user;
  }

  constructor(private http: HttpClient) { 
    this.userSubscription = this.user$.subscribe({
      next:(user) => {
        this.user = user;}
    })
  }

  login(email:string, password:string | number){
    return this.http.post<UserForApi>('api/users/login', {email,password},{headers:this.headers}).pipe(tap((user) => this.user$$.next(user)));
  }
  register(email:string, password:string | number){
    return this.http.post<UserForApi>('api/users/register', {email,password},{headers:this.headers}).pipe(tap((user) => this.user$$.next(user)));
  }

  logout(){
    let userData:string= localStorage.getItem('userData')!;
    let userToken= JSON.parse(userData).accessToken;
    let newHeader = this.headers.append('X-Authorization',`${userToken}`)
    return this.http.get<UserForApi>('api/users/logout', {headers:newHeader}).pipe(tap((user) => this.user$$.next(null)));
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }

}

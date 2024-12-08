import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ErrorsComponent } from '../errors/errors.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, ErrorsComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  errorContainer:string[] = [];

  get isUserLoged(): boolean {
    return this.userService.isLogged;
  }

  constructor(private userService: UserService , private router: Router){

  }

  onAnimationEnd(data:boolean){
    if(data){
      this.errorContainer = [];
      return;
    }
  }

  logoutFn(){
    this.userService.logout().subscribe({
      next: () => {
      this.router.navigate(['/catalog']);
      localStorage.removeItem('userData');
    },error: (err) => {
      this.errorContainer.push(err);
      this.userService.user = null;
      localStorage.removeItem('userData');
      this.router.navigate(['/catalog']);
    }})
  }

}

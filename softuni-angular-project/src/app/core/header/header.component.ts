import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  get isUserLoged(): boolean {
    return this.userService.isLogged;
  }

  constructor(private userService: UserService , private router: Router){

  }
  logoutFn(){
    this.userService.logout().subscribe(() => {
      this.router.navigate(['/catalog']);
      localStorage.removeItem('userData');
    }
  )
  }
}

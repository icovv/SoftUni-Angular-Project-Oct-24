import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'softuni-angular-project';

  constructor(private userService: UserService){

  }
  
  ngOnInit(): void {
        if(localStorage.length > 0 && this.userService.user == null){
          this.userService.user = JSON.parse(localStorage.getItem('userData')!);
      return;
    }
  }
}

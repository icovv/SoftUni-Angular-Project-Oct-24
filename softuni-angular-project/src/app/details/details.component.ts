import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Cars } from '../types/cars';
import { ApiService } from '../services/api.service';
import { UserService } from '../services/user.service';
import { UserForApi } from '../types/user';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
  car: Cars | null = null;
  get user():UserForApi | null {
    return this.userService.user;
  }
  constructor(private activatedRoute: ActivatedRoute, private api: ApiService, private router: Router, private userService: UserService){

  }

  ngOnInit(): void {
    let carID = this.activatedRoute.snapshot.params?.['carId']

    this.api.getSingleCar(carID).subscribe({
      next: (data) => {
        this.car = data;
      },
      error: (err) => {
        this.router.navigate(['/404'])
      }
    })
  }
}

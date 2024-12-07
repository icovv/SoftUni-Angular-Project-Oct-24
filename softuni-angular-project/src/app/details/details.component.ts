import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Cars } from '../types/cars';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
  car: Cars | null = null;

  constructor(private activatedRoute: ActivatedRoute, private api: ApiService, private router: Router){

  }

  ngOnInit(): void {
    let carID = this.activatedRoute.snapshot.params?.['carId']

    this.api.getSingleCar(carID).subscribe({
      next: (data) => {
        this.car = data;
        console.log(this.car);
      },
      error: (err) => {
        this.router.navigate(['/404'])
      }
    })
  }
}

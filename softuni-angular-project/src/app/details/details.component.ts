import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Cars } from '../types/cars';
import { ApiService } from '../services/api.service';
import { UserService } from '../services/user.service';
import { UserForApi } from '../types/user';
import { ErrorsComponent } from '../core/errors/errors.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [RouterLink, ErrorsComponent, DatePipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
  car: Cars | null = null;
  errorContainer:string[] = [];
  get user():UserForApi | null {
    return this.userService.user;
  }

  constructor(private activatedRoute: ActivatedRoute, private api: ApiService, private router: Router, private userService: UserService,){

  }

  onAnimationEnd(data:boolean){
    if(data){
      this.errorContainer = [];
      return;
    }
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

  likeItem(){
   this.api.addLikesToCar(this.car?._id!, this.user?._id!).subscribe({
    next:(data) => {
      this.car = data;
    },
    error: (err) => {
      this.errorContainer.push(err)
    }
   })
  }

  DislikeItem(){
    this.api.removeLikesToCar(this.car?._id!, this.user?._id!).subscribe({
      next:(data) => {
        this.car = data;
      },
      error: (err) => {
        this.errorContainer.push(err)
      }
     })
  }
  deleteItem(){
    let confirmationPopUp = window.confirm('Are you sure you want to delete this car?')
    if(confirmationPopUp){
      this.api.deleteCar(this.car?._id!).subscribe({
        next:(data) =>{
          this.router.navigate(['/catalog']);
        },
        error:(err) => {
          this.errorContainer.push(err);
        }
      })
    }

  }
}

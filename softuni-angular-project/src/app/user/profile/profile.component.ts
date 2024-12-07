import { Component, OnInit } from '@angular/core';
import { LoaderComponent } from '../../core/loader/loader.component';
import { Cars } from '../../types/cars';
import { UserService } from '../../services/user.service';
import { DatePipe } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { ErrorsComponent } from '../../core/errors/errors.component';
import {UserForApi } from '../../types/user';
import { ProfileListedItemsComponent } from "./profile-listed-items/profile-listed-items.component";
import { ProfileLikedItemsComponent } from './profile-liked-items/profile-liked-items.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [DatePipe, ErrorsComponent, ProfileListedItemsComponent, ProfileLikedItemsComponent, LoaderComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  likedItems: Cars[] = [];
  listedItems: Cars[] = [];
  errorContainer:string[]= [];
  isLoading: boolean = true;
  get user():UserForApi | null {
    return this.userService.user;
  }

  onAnimationEnd(data:boolean): void{
    if(data == true){
      this.errorContainer = [];
      return
    }
  }

  constructor(private userService: UserService, private api: ApiService){

  }
  
  
  ngOnInit(): void {
    this.api.getAllCars().subscribe({
      next:(items) => {
        for (let item of items) {
          if (item._ownerId == this.user?._id) {
            this.listedItems.push(item);
          }
        }
        for (let item of items) {
          if (item.likes.includes(this.user?._id!)) {
            this.likedItems.push(item);
          }
        }
        this.isLoading = false;
      },
      error:(err) => {
         this.errorContainer.push(err);
         this.isLoading = true;
      }
    });
  }
}

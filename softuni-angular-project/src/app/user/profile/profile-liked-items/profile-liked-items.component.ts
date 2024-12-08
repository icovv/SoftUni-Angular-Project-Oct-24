import { Component, Input } from '@angular/core';
import { Cars } from '../../../types/cars';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-profile-liked-items',
  imports: [RouterLink, DatePipe],
  templateUrl: './profile-liked-items.component.html',
  styleUrl: './profile-liked-items.component.css'
})
export class ProfileLikedItemsComponent {
  @Input() car:Cars | null = null;
}

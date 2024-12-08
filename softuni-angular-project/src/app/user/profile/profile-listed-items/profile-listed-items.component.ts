import { Component, Input } from '@angular/core';
import { Cars } from '../../../types/cars';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-profile-listed-items',
  imports: [RouterLink,DatePipe],
  templateUrl: './profile-listed-items.component.html',
  styleUrl: './profile-listed-items.component.css'
})
export class ProfileListedItemsComponent {
@Input() car:Cars | null = null;
}

import { Component, Input } from '@angular/core';
import { Cars } from '../../types/cars';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-search-single-item',
  imports: [RouterLink, DatePipe],
  templateUrl: './search-single-item.component.html',
  styleUrl: './search-single-item.component.css'
})
export class SearchSingleItemComponent {
  @Input() car:Cars | null = null;
}

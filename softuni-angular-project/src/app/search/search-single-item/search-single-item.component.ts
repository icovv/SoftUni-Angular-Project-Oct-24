import { Component, Input } from '@angular/core';
import { Cars } from '../../types/cars';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-search-single-item',
  imports: [RouterLink],
  templateUrl: './search-single-item.component.html',
  styleUrl: './search-single-item.component.css'
})
export class SearchSingleItemComponent {
  @Input() car:Cars | null = null;
}

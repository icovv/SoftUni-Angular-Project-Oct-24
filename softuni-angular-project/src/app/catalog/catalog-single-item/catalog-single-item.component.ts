import { Component, Input } from '@angular/core';
import { Cars } from '../../types/cars';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-catalog-single-item',
  standalone:true,
  imports: [RouterLink],
  templateUrl: './catalog-single-item.component.html',
  styleUrl: './catalog-single-item.component.css'
})
export class CatalogSingleItemComponent {
  @Input() car:Cars | null = null;
}

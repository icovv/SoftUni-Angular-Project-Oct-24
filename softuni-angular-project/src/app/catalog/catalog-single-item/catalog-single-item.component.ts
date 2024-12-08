import { Component, Input } from '@angular/core';
import { Cars } from '../../types/cars';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-catalog-single-item',
  standalone:true,
  imports: [RouterLink, DatePipe],
  templateUrl: './catalog-single-item.component.html',
  styleUrl: './catalog-single-item.component.css'
})
export class CatalogSingleItemComponent {
  @Input() car:Cars | null = null;
}

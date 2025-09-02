import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-box.html',
  styleUrl: './product-box.css',
})
export class ProductBox {
  @Input() imageUrl: string = '';
  @Input() title: string = '';
  @Input() price: string = '';
}

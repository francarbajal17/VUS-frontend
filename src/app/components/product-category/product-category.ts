import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductBox } from '../product-box/product-box';

export interface Product {
  imageUrl: string;
  imageUrlBack: string;
  title: string;
  price: string;
}

@Component({
  selector: 'app-product-category',
  standalone: true,
  imports: [CommonModule, ProductBox],
  templateUrl: './product-category.html',
  styleUrl: './product-category.css',
})
export class ProductCategory {
  @Input() title: string = '';
  @Input() products: Product[] = [];
}

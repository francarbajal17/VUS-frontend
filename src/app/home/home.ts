import { Component } from '@angular/core';
import { Header } from '../components/header/header';
import { Hero } from '../components/hero/hero';
import { ProductCategory } from '../components/product-category/product-category';
import { Product } from '../components/product-category/product-category';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Header, Hero, ProductCategory],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  protected readonly tshirts: Product[] = [
    {
      imageUrl: '/assets/placeholder.svg',
      title: 'Oversized Black T-Shirt',
      price: 'UYU 1290',
    },
    {
      imageUrl: '/assets/placeholder.svg',
      title: 'Oversized White T-Shirt',
      price: 'UYU 1290',
    },
    {
      imageUrl: '/assets/placeholder.svg',
      title: 'Oversized Orange T-Shirt',
      price: 'UYU 1290',
    },
    {
      imageUrl: '/assets/placeholder.svg',
      title: 'Oversized Blue T-Shirt',
      price: 'UYU 1290',
    },
  ];

  protected readonly hoodies: Product[] = [
    {
      imageUrl: '/assets/placeholder.svg',
      title: 'Oversized Black Hoodie',
      price: 'UYU 2090',
    },
    {
      imageUrl: '/assets/placeholder.svg',
      title: 'Oversized Mushroom Hoodie',
      price: 'UYU 2090',
    },
    {
      imageUrl: '/assets/placeholder.svg',
      title: 'Oversized Grey Hoodie',
      price: 'UYU 2090',
    },
    {
      imageUrl: '/assets/placeholder.svg',
      title: 'Oversized Black Hoodie',
      price: 'UYU 2090',
    },
  ];
}

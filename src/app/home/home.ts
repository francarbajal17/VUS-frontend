import { Component } from '@angular/core';
import { Header } from '../components/header/header';
import { Hero } from '../components/hero/hero';
import { ProductCategory } from '../components/product-category/product-category';
import { Product } from '../components/product-category/product-category';
import { GetToKnowUsComponent } from '../components/get-to-know-us/get-to-know-us';
import { Footer } from '../components/footer/footer';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Header, Hero, ProductCategory, GetToKnowUsComponent, Footer],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  protected readonly tshirts: Product[] = [
    {
      imageUrl: '/t-shirts/BlackFront.png',
      imageUrlBack: '/t-shirts/BlackBack.png',
      title: 'Oversized Black T-Shirt',
      price: 'UYU 1290',
    },
    {
      imageUrl: '/t-shirts/WhiteFront.png',
      imageUrlBack: '/t-shirts/WhiteBack.png',
      title: 'Oversized White T-Shirt',
      price: 'UYU 1290',
    },
  ];

  protected readonly hoodies: Product[] = [
    {
      imageUrl: '/hoodies/BlackFront.png',
      imageUrlBack: '/hoodies/BlackBack.png',
      title: 'Oversized Black Hoodie',
      price: 'UYU 2090',
    },
    {
      imageUrl: '/hoodies/BeigeFront.png',
      imageUrlBack: '/hoodies/BeigeBack.png',
      title: 'Oversized Mushroom Hoodie',
      price: 'UYU 2090',
    },
    {
      imageUrl: '/hoodies/BlueFront.png',
      imageUrlBack: '/hoodies/BlueBack.png',
      title: 'Oversized Blue Hoodie',
      price: 'UYU 2090',
    },
  ];
}

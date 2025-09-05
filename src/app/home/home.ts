import { Component } from '@angular/core';
import { Header } from '../components/header/header';
import { Hero } from '../components/hero/hero';
import { ProductCategory } from '../components/product-category/product-category';
import { Product } from '../components/product-category/product-category';
import { GetToKnowUsComponent } from '../components/get-to-know-us/get-to-know-us';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Header, Hero, ProductCategory, GetToKnowUsComponent],
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
    {
      imageUrl: '/t-shirts/OrangeFront.png',
      imageUrlBack: '/t-shirts/OrangeBack.png',
      title: 'Oversized Orange T-Shirt',
      price: 'UYU 1290',
    },
    {
      imageUrl: '/t-shirts/BlueFront.png',
      imageUrlBack: '/t-shirts/BlueBack.png',
      title: 'Oversized Blue T-Shirt',
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
    {
      imageUrl: '/hoodies/GreenFront.png',
      imageUrlBack: '/hoodies/GreenBack.png',
      title: 'Oversized Green Hoodie',
      price: 'UYU 2090',
    },
  ];
}

import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Header } from '../components/header/header';
import { Hero } from '../components/hero/hero';
import { ProductCategory } from '../components/product-category/product-category';
import { GetToKnowUsComponent } from '../components/get-to-know-us/get-to-know-us';
import { Footer } from '../components/footer/footer';

interface BackendResponse {
  [categoryName: string]: BackendItem[];
}

interface BackendItem {
  _id: string;
  name: string;
  category: {
    _id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  principalItem: boolean;
  sizes: string[];
  frontImage: string;
  backImage: string;
  section1LeftImage: string;
  section1RightImage: string;
  section2LeftImage: string;
  section2RightImage: string;
  price: number;
  drop: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

type ProductCategoryProduct = import('../components/product-category/product-category').Product;

function toDisplayProduct(item: BackendItem): ProductCategoryProduct {
  return {
    title: item.name,
    price: `UYU ${item.price}`,
    imageUrl: item.frontImage,
    imageUrlBack: item.backImage,
  };
}

function transformBackendData(data: BackendResponse): Record<string, ProductCategoryProduct[]> {
  const result: Record<string, ProductCategoryProduct[]> = {};
  for (const [categoryName, items] of Object.entries(data)) {
    result[categoryName] = items.map(toDisplayProduct);
  }
  return result;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, Header, Hero, ProductCategory, GetToKnowUsComponent, Footer],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  principalItems: Record<string, ProductCategoryProduct[]> = {};
  categoryNames: string[] = [];
  private http = inject(HttpClient);

  ngOnInit(): void {
    this.fetchPrincipalItems();
  }

  fetchPrincipalItems(): void {
    this.http.get<BackendResponse>('https://vus-backend.vercel.app/api/principal-items').subscribe({
      next: (data) => {
        this.principalItems = transformBackendData(data);
        this.categoryNames = Object.keys(this.principalItems);
      },
      error: (error) => console.error('Error fetching principal items:', error),
    });
  }
}

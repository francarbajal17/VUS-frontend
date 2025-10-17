import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

export interface BackendItem {
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

export interface Product {
  id: string;
  name: string;
  price: string;
  ImageSection1Left: string;
  ImageSection1Right: string;
  ImageSection2Left: string;
  ImageSection2Right: string;
  sizes: string[];
}

function transformBackendItem(backendItem: BackendItem): Product {
  return {
    id: backendItem._id,
    name: backendItem.name,
    price: `UYU ${backendItem.price}`,
    ImageSection1Left: backendItem.section1LeftImage,
    ImageSection1Right: backendItem.section1RightImage,
    ImageSection2Left: backendItem.section2LeftImage,
    ImageSection2Right: backendItem.section2RightImage,
    sizes: backendItem.sizes,
  };
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);

  getProductById(id: string): Observable<Product> {
    return this.http
      .get<BackendItem>(`https://vus-backend.vercel.app/api/items/${id}`)
      .pipe(map((data) => transformBackendItem(data)));
  }

  //getProductByName(): Product | undefined {
  // Por ahora siempre devuelve el producto de ejemplo
  //return this.exampleProduct;
  //}

  //getAllProducts(): Product[] {
  //  return [this.exampleProduct];
  //}
}

import { Injectable } from '@angular/core';

export interface Product {
  id: string;
  name: string;
  price: string;
  category: 'tshirts' | 'hoodies';
  color: string;
  ImageSection1Left: string;
  ImageSection1Right: string;
  ImageSection2Left: string;
  ImageSection2Right: string;
  description: string;
  sizes: string[];
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // Producto de ejemplo para mostrar el diseño de la product detail page
  private exampleProduct: Product = {
    id: 'oversized-orange-t-shirt',
    name: 'Oversized Orange T-Shirt',
    price: 'UYU 1290',
    category: 'tshirts',
    color: 'Orange',
    ImageSection1Left: '/products/VUSaltosec1.png',
    ImageSection1Right: '/products/VUSanchosec1.png',
    ImageSection2Left: '/products/VUSanchosec2.png',
    ImageSection2Right: '/products/VUSaltosec2.png',
    description: 'Camiseta oversized de algodón con corte holgado y diseño minimalista.',
    sizes: ['S', 'M', 'L'],
  };

  //getProductById(): Product | undefined {
  // Por ahora siempre devuelve el producto de ejemplo
  //return this.exampleProduct;
  //}

  getProductByName(): Product | undefined {
    // Por ahora siempre devuelve el producto de ejemplo
    return this.exampleProduct;
  }

  getAllProducts(): Product[] {
    return [this.exampleProduct];
  }
}

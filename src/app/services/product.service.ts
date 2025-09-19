import { Injectable } from '@angular/core';

export interface Product {
  id: string;
  name: string;
  price: string;
  category: 'tshirts' | 'hoodies';
  color: string;
  frontImage: string;
  backImage: string;
  description: string;
  sizes: string[];
  shippingInfo: string;
  paymentMethod: string;
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
    frontImage: '/t-shirts/OrangeFront.png',
    backImage: '/t-shirts/OrangeBack.png',
    description: 'Camiseta oversized de algodón con corte holgado y diseño minimalista.',
    sizes: ['S', 'M', 'L'],
    shippingInfo:
      'Envíos todo el país. Se coordina al momento de realizar el pedido. Por la zona a cargo nuestro, envíos al interior o demás mediante DAC abonados por el cliente al momento de recibir el pedido.',
    paymentMethod: 'Transferencia bancaria o efectivo en la entrega.',
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

import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService, Product } from '../../services/product.service';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, Footer, Header],
  standalone: true,
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);

  protected product: Product | undefined;
  protected selectedSize = signal<string>('M');
  protected productName: string = '';

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.productName = params['productName'] || '';
      this.product = this.productService.getProductByName();
    });
  }

  onSizeSelect(size: string): void {
    this.selectedSize.set(size);
  }

  onConsultar(): void {
    // Aquí se puede implementar la lógica para contactar
    console.log('Consultar producto:', this.product?.name, 'Talla:', this.selectedSize());
  }
}

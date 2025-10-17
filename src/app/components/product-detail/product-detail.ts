import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService, Product } from '../../services/product.service';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, Footer],
  standalone: true,
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);

  protected product: Product | undefined;
  protected selectedSize = signal<string>('');
  protected productName: string = '';
  protected productId: string = '';

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['productId'];
      console.log(id);

      this.productService.getProductById(id).subscribe({
        next: (product) => {
          this.product = product;
        },
        error: (error) => console.error('Error al cargar el producto:', error),
      });
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

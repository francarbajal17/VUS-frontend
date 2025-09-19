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

  // Carrusel 1 (imágenes altas)
  protected carousel1Index = signal<number>(0);
  protected carousel1Images: string[] = [];

  // Carrusel 3 (imágenes anchas)
  protected carousel3Index = signal<number>(0);
  protected carousel3Images: string[] = [];

  // Variables para touch/swipe
  private touchStartX = 0;
  private touchEndX = 0;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.productName = params['productName'] || '';
      this.product = this.productService.getProductByName();

      if (this.product) {
        // Configurar imágenes para carrusel 1 (altas)
        this.carousel1Images = [this.product.ImageSection1Left, this.product.ImageSection2Right];

        // Configurar imágenes para carrusel 3 (anchas)
        this.carousel3Images = [this.product.ImageSection1Right, this.product.ImageSection2Left];
      }
    });
  }

  onSizeSelect(size: string): void {
    this.selectedSize.set(size);
  }

  onConsultar(): void {
    // Aquí se puede implementar la lógica para contactar
    console.log('Consultar producto:', this.product?.name, 'Talla:', this.selectedSize());
  }

  // Métodos para carrusel 1
  nextCarousel1(): void {
    const currentIndex = this.carousel1Index();
    const nextIndex = (currentIndex + 1) % this.carousel1Images.length;
    this.carousel1Index.set(nextIndex);
  }

  prevCarousel1(): void {
    const currentIndex = this.carousel1Index();
    const prevIndex = currentIndex === 0 ? this.carousel1Images.length - 1 : currentIndex - 1;
    this.carousel1Index.set(prevIndex);
  }

  // Métodos para carrusel 3
  nextCarousel3(): void {
    const currentIndex = this.carousel3Index();
    const nextIndex = (currentIndex + 1) % this.carousel3Images.length;
    this.carousel3Index.set(nextIndex);
  }

  prevCarousel3(): void {
    const currentIndex = this.carousel3Index();
    const prevIndex = currentIndex === 0 ? this.carousel3Images.length - 1 : currentIndex - 1;
    this.carousel3Index.set(prevIndex);
  }

  // Métodos para touch/swipe
  onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.touches[0].clientX;
  }

  onTouchEnd(event: TouchEvent): void {
    this.touchEndX = event.changedTouches[0].clientX;
    this.handleSwipe();
  }

  private handleSwipe(): void {
    const swipeThreshold = 50; // Mínimo de píxeles para considerar un swipe
    const diff = this.touchStartX - this.touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swipe hacia la izquierda - siguiente imagen
        this.nextCarousel1();
        this.nextCarousel3();
      } else {
        // Swipe hacia la derecha - imagen anterior
        this.prevCarousel1();
        this.prevCarousel3();
      }
    }
  }
}

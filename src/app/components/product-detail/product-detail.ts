import { Component, inject, OnInit, signal, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
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
  private platformId = inject(PLATFORM_ID);

  protected product: Product | undefined;
  protected selectedSize = signal<string>('');
  protected productName: string = '';

  // Carrusel 1 (imágenes altas)
  protected carousel1Index = signal<number>(0);
  protected carousel1Images: string[] = [];

  // Carrusel 3 (imágenes anchas)
  protected carousel3Index = signal<number>(0);
  protected carousel3Images: string[] = [];

  // Variables para touch/swipe mejorado con imágenes conectadas - Carrusel 1
  private touchStartX1 = 0;
  private touchEndX1 = 0;
  private touchCurrentX1 = 0;
  private isDragging1 = false;
  private dragOffset1 = 0;
  private animationFrameId1: number | null = null;

  // Variables para touch/swipe mejorado con imágenes conectadas - Carrusel 3
  private touchStartX3 = 0;
  private touchEndX3 = 0;
  private touchCurrentX3 = 0;
  private isDragging3 = false;
  private dragOffset3 = 0;
  private animationFrameId3: number | null = null;

  private carouselWidth = 0;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.productName = params['productName'] || '';
      this.product = this.productService.getProductByName();

      if (this.product) {
        // Configurar imágenes para carrusel 1 (altas)
        this.carousel1Images = [this.product.ImageSection1Left, this.product.ImageSection2Right];

        // Configurar imágenes para carrusel 3 (anchas)
        this.carousel3Images = [this.product.ImageSection1Right, this.product.ImageSection2Left];

        // Obtener el ancho del carrusel después de que se renderice (solo en el navegador)
        if (isPlatformBrowser(this.platformId)) {
          setTimeout(() => {
            this.updateCarouselWidth();
          }, 100);
        }
      }
    });
  }

  private updateCarouselWidth(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const carouselContainer = document.querySelector('.carousel-container') as HTMLElement;
    if (carouselContainer) {
      this.carouselWidth = carouselContainer.offsetWidth;
    }
  }

  onSizeSelect(size: string): void {
    this.selectedSize.set(size);
  }

  onConsultar(): void {
    // Aquí se puede implementar la lógica para contactar
    console.log('Consultar producto:', this.product?.name, 'Talla:', this.selectedSize());
  }

  // Métodos para carrusel 1 - Solo navegación hacia adelante
  nextCarousel1(): void {
    const currentIndex = this.carousel1Index();
    if (currentIndex < this.carousel1Images.length - 1) {
      this.carousel1Index.set(currentIndex + 1);
    }
  }

  prevCarousel1(): void {
    const currentIndex = this.carousel1Index();
    if (currentIndex > 0) {
      this.carousel1Index.set(currentIndex - 1);
    }
  }

  // Métodos para carrusel 3 - Solo navegación hacia adelante
  nextCarousel3(): void {
    const currentIndex = this.carousel3Index();
    if (currentIndex < this.carousel3Images.length - 1) {
      this.carousel3Index.set(currentIndex + 1);
    }
  }

  prevCarousel3(): void {
    const currentIndex = this.carousel3Index();
    if (currentIndex > 0) {
      this.carousel3Index.set(currentIndex - 1);
    }
  }

  // Métodos para touch/swipe del Carrusel 1 (imágenes altas)
  onTouchStart1(event: TouchEvent): void {
    if (!isPlatformBrowser(this.platformId)) return;

    event.preventDefault();
    this.touchStartX1 = event.touches[0].clientX;
    this.touchCurrentX1 = this.touchStartX1;
    this.isDragging1 = true;
    this.dragOffset1 = 0;

    // Cancelar cualquier animación en curso
    if (this.animationFrameId1) {
      cancelAnimationFrame(this.animationFrameId1);
    }
  }

  onTouchMove1(event: TouchEvent): void {
    if (!isPlatformBrowser(this.platformId) || !this.isDragging1) return;

    event.preventDefault();
    this.touchCurrentX1 = event.touches[0].clientX;
    this.dragOffset1 = this.touchCurrentX1 - this.touchStartX1;

    // Aplicar transformación visual en tiempo real sin límites
    this.updateCarouselTransform1();
  }

  onTouchEnd1(event: TouchEvent): void {
    if (!isPlatformBrowser(this.platformId) || !this.isDragging1) return;

    this.isDragging1 = false;
    this.touchEndX1 = event.changedTouches[0].clientX;

    // Determinar si debe cambiar de imagen basado en el desplazamiento
    const swipeThreshold = this.carouselWidth * 0.2; // 20% del ancho del carrusel
    const diff = this.touchStartX1 - this.touchEndX1;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swipe hacia la izquierda - siguiente imagen
        this.nextCarousel1();
      } else {
        // Swipe hacia la derecha - imagen anterior
        this.prevCarousel1();
      }
    }

    // Resetear transformación
    this.resetCarouselTransform1();
  }

  // Métodos para touch/swipe del Carrusel 3 (imágenes anchas)
  onTouchStart3(event: TouchEvent): void {
    if (!isPlatformBrowser(this.platformId)) return;

    event.preventDefault();
    this.touchStartX3 = event.touches[0].clientX;
    this.touchCurrentX3 = this.touchStartX3;
    this.isDragging3 = true;
    this.dragOffset3 = 0;

    // Cancelar cualquier animación en curso
    if (this.animationFrameId3) {
      cancelAnimationFrame(this.animationFrameId3);
    }
  }

  onTouchMove3(event: TouchEvent): void {
    if (!isPlatformBrowser(this.platformId) || !this.isDragging3) return;

    event.preventDefault();
    this.touchCurrentX3 = event.touches[0].clientX;
    this.dragOffset3 = this.touchCurrentX3 - this.touchStartX3;

    // Aplicar transformación visual en tiempo real sin límites
    this.updateCarouselTransform3();
  }

  onTouchEnd3(event: TouchEvent): void {
    if (!isPlatformBrowser(this.platformId) || !this.isDragging3) return;

    this.isDragging3 = false;
    this.touchEndX3 = event.changedTouches[0].clientX;

    // Determinar si debe cambiar de imagen basado en el desplazamiento
    const swipeThreshold = this.carouselWidth * 0.2; // 20% del ancho del carrusel
    const diff = this.touchStartX3 - this.touchEndX3;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swipe hacia la izquierda - siguiente imagen
        this.nextCarousel3();
      } else {
        // Swipe hacia la derecha - imagen anterior
        this.prevCarousel3();
      }
    }

    // Resetear transformación
    this.resetCarouselTransform3();
  }

  private calculateResistance(
    currentIndex: number,
    totalImages: number,
    dragOffset: number,
  ): number {
    // Si estamos en la primera imagen (índice 0) y deslizamos hacia la derecha
    if (currentIndex === 0 && dragOffset > 0) {
      // Resistencia progresiva: más difícil cuanto más deslices
      const maxResistance = 0.1; // Máximo 10% del movimiento original
      const resistanceFactor = Math.min(dragOffset / (this.carouselWidth * 0.5), 1); // Resistencia aumenta hasta 50% del ancho
      return maxResistance + 0.2 * resistanceFactor; // Entre 10% y 30%
    }

    // Si estamos en la última imagen y deslizamos hacia la izquierda
    if (currentIndex === totalImages - 1 && dragOffset < 0) {
      // Resistencia progresiva: más difícil cuanto más deslices
      const maxResistance = 0.1; // Máximo 10% del movimiento original
      const resistanceFactor = Math.min(Math.abs(dragOffset) / (this.carouselWidth * 0.5), 1); // Resistencia aumenta hasta 50% del ancho
      return maxResistance + 0.2 * resistanceFactor; // Entre 10% y 30%
    }

    // Sin resistencia para movimientos normales
    return 1;
  }

  // Métodos de transformación específicos para Carrusel 1
  private updateCarouselTransform1(): void {
    const carouselTrack = document.querySelector(
      '.mobile-section-1 .carousel-track',
    ) as HTMLElement;
    if (!carouselTrack) return;

    const currentIndex = this.carousel1Index();
    const totalImages = this.carousel1Images.length;

    // Calcular la posición base
    const basePosition = -currentIndex * 100;

    // Calcular el porcentaje de drag con resistencia
    let dragPercentage = (this.dragOffset1 / this.carouselWidth) * 100;

    // Aplicar resistencia progresiva en los bordes
    const resistanceFactor = this.calculateResistance(currentIndex, totalImages, this.dragOffset1);
    dragPercentage = dragPercentage * resistanceFactor;

    const totalPosition = basePosition + dragPercentage;

    carouselTrack.style.transform = `translateX(${totalPosition}%)`;
    carouselTrack.style.transition = 'none';
  }

  private resetCarouselTransform1(): void {
    const carouselTrack = document.querySelector(
      '.mobile-section-1 .carousel-track',
    ) as HTMLElement;
    if (!carouselTrack) return;

    const currentIndex = this.carousel1Index();

    carouselTrack.style.transition = 'transform 0.3s ease-out';
    carouselTrack.style.transform = `translateX(${-currentIndex * 100}%)`;

    // Limpiar la transformación después de la animación
    setTimeout(() => {
      carouselTrack.style.transition = '';
    }, 300);

    this.dragOffset1 = 0;
  }

  // Métodos de transformación específicos para Carrusel 3
  private updateCarouselTransform3(): void {
    const carouselTrack = document.querySelector(
      '.mobile-section-3 .carousel-track',
    ) as HTMLElement;
    if (!carouselTrack) return;

    const currentIndex = this.carousel3Index();
    const totalImages = this.carousel3Images.length;

    // Calcular la posición base
    const basePosition = -currentIndex * 100;

    // Calcular el porcentaje de drag con resistencia
    let dragPercentage = (this.dragOffset3 / this.carouselWidth) * 100;

    // Aplicar resistencia progresiva en los bordes
    const resistanceFactor = this.calculateResistance(currentIndex, totalImages, this.dragOffset3);
    dragPercentage = dragPercentage * resistanceFactor;

    const totalPosition = basePosition + dragPercentage;

    carouselTrack.style.transform = `translateX(${totalPosition}%)`;
    carouselTrack.style.transition = 'none';
  }

  private resetCarouselTransform3(): void {
    const carouselTrack = document.querySelector(
      '.mobile-section-3 .carousel-track',
    ) as HTMLElement;
    if (!carouselTrack) return;

    const currentIndex = this.carousel3Index();

    carouselTrack.style.transition = 'transform 0.3s ease-out';
    carouselTrack.style.transform = `translateX(${-currentIndex * 100}%)`;

    // Limpiar la transformación después de la animación
    setTimeout(() => {
      carouselTrack.style.transition = '';
    }, 300);

    this.dragOffset3 = 0;
  }
}

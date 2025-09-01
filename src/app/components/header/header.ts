import { Component, OnInit, OnDestroy, signal, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit, OnDestroy {
  protected readonly headerClass = signal('header-normal');
  protected readonly blackBarOpacity = signal(0.9);
  protected readonly whiteBarVisible = signal(true);
  protected readonly logoHovered = signal(false);

  private readonly scrollDuration = 800; // en milisegundos

  private platformId = inject(PLATFORM_ID);
  private scrollListener: (() => void) | null = null;

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.setupScrollListener();
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId) && this.scrollListener) {
      window.removeEventListener('scroll', this.scrollListener);
    }
  }

  // Métodos para el hover del logo
  onLogoMouseEnter() {
    this.logoHovered.set(true);
  }

  onLogoMouseLeave() {
    this.logoHovered.set(false);
  }

  // Método para hacer scroll hacia arriba
  onLogoClick() {
    this.scrollToTop();
  }

  private scrollToTop() {
    if (isPlatformBrowser(this.platformId)) {
      const startPosition = window.pageYOffset;
      const startTime = performance.now();

      const animateScroll = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / this.scrollDuration, 1);

        // Función de easing para un scroll más suave
        const easeInOutCubic = (t: number) => {
          return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        };

        const easedProgress = easeInOutCubic(progress);
        const newPosition = startPosition * (1 - easedProgress);

        window.scrollTo(0, newPosition);

        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        }
      };

      requestAnimationFrame(animateScroll);
    }
  }

  private setupScrollListener() {
    this.scrollListener = () => {
      const scrollY = window.scrollY;
      const heroSection = document.querySelector('.hero-section');

      if (heroSection) {
        const heroRect = heroSection.getBoundingClientRect();
        const heroBottom = heroRect.bottom;

        // Cambiar clases del header basado en la posición
        if (scrollY <= 0) {
          // Al inicio de la página
          this.headerClass.set('header-normal');
          this.blackBarOpacity.set(0.9);
          this.whiteBarVisible.set(true);
        } else if (scrollY > 0 && heroBottom > 0) {
          // Durante la sección hero
          this.headerClass.set('header-sticky');

          // Calcular transparencia progresiva en los primeros 350px
          const transparencyProgress = Math.min(1, scrollY / 350);
          const opacity = 0.9 - transparencyProgress * 0.8; // De 0.9 a 0.1
          this.blackBarOpacity.set(opacity);

          // Ocultar la barra blanca después de 50px de scroll
          if (scrollY > 50) {
            this.whiteBarVisible.set(false);
          } else {
            this.whiteBarVisible.set(true);
          }
        } else {
          // Fuera de la sección hero
          this.headerClass.set('header-hidden');
          this.blackBarOpacity.set(0.1);
          this.whiteBarVisible.set(false);
        }
      }
    };

    window.addEventListener('scroll', this.scrollListener);
  }
}

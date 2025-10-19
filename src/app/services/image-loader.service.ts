import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { LoadingService } from './loading.service';
import { isPlatformBrowser } from '@angular/common';
import { Product } from './product.service';
// Type-only import for home cards (front/back images)
import type { Product as HomeCardProduct } from '../components/product-category/product-category';

@Injectable({
  providedIn: 'root',
})
export class ImageLoaderService {
  private platformId = inject(PLATFORM_ID);

  //constructor(private loadingService: LoadingService) {}

  private loadingService = inject(LoadingService);

  /**
   * Precarga una imagen y retorna una Promise que se resuelve cuando la imagen está cargada
   * @param imageUrl URL de la imagen a precargar
   * @returns Promise que se resuelve cuando la imagen está cargada
   */
  private preloadImage(imageUrl: string): Promise<void> {
    return new Promise((resolve) => {
      if (!imageUrl || !isPlatformBrowser(this.platformId)) {
        resolve();
        return;
      }

      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => {
        console.warn(`Error loading image: ${imageUrl}`);
        resolve(); // Resolvemos igual para no bloquear la carga
      };
      img.src = imageUrl;
    });
  }

  /**
   * Precarga múltiples imágenes y retorna una Promise que se resuelve cuando todas están cargadas
   * @param imageUrls Array de URLs de imágenes a precargar
   * @returns Promise que se resuelve cuando todas las imágenes están cargadas
   */
  async preloadImages(imageUrls: string[]): Promise<void> {
    const validUrls = imageUrls.filter((url) => url && url.trim() !== '');

    if (validUrls.length === 0) {
      return Promise.resolve();
    }

    try {
      await Promise.all(validUrls.map((url) => this.preloadImage(url)));
    } catch (error) {
      console.error('Error preloading images:', error);
    }
  }

  /**
   * Precarga imágenes para la Home (cards): front y back image
   * @param products Productos usados en las cards de Home
   * @param loadingMessage Mensaje a mostrar durante la carga
   */
  async preloadHomeCardImages(
    products: HomeCardProduct[],
    loadingMessage: string = 'Loading products...',
  ): Promise<void> {
    this.loadingService.startLoading(loadingMessage);

    try {
      const imageUrls: string[] = [];

      // Extraer front/back de las cards
      products.forEach((product) => {
        if (product.imageUrl) imageUrls.push(product.imageUrl);
        if (product.imageUrlBack) imageUrls.push(product.imageUrlBack);
      });

      await this.preloadImages(imageUrls);
    } finally {
      this.loadingService.stopLoading();
    }
  }

  /**
   * Precarga imágenes de un producto individual y maneja el estado de loading
   * @param product Producto con imágenes
   * @param loadingMessage Mensaje a mostrar durante la carga
   */
  async preloadSingleProductImages(
    product: Product,
    loadingMessage: string = 'Loading product...',
  ): Promise<void> {
    this.loadingService.startLoading(loadingMessage);

    try {
      const imageUrls: string[] = [];

      // Extraer todas las URLs de imágenes del producto
      if (product.ImageSection1Left) imageUrls.push(product.ImageSection1Left);
      if (product.ImageSection1Right) imageUrls.push(product.ImageSection1Right);
      if (product.ImageSection2Left) imageUrls.push(product.ImageSection2Left);
      if (product.ImageSection2Right) imageUrls.push(product.ImageSection2Right);

      await this.preloadImages(imageUrls);
    } finally {
      this.loadingService.stopLoading();
    }
  }
}

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../components/loading/loading';
import { LoadingService } from '../services/loading.service';
import { ImageLoaderService } from '../services/image-loader.service';

@Component({
  selector: 'app-page-get-to-know',
  standalone: true,
  imports: [CommonModule, LoadingComponent],
  templateUrl: './page-get-to-know.html',
  styleUrl: './page-get-to-know.css',
})
export class PageGetToKnow implements OnInit {
  protected loadingService = inject(LoadingService);
  private imageLoaderService = inject(ImageLoaderService);

  ngOnInit(): void {
    this.loadImages();
  }

  private async loadImages(): Promise<void> {
    this.loadingService.startLoading('Loading...');

    try {
      // Precargar imágenes de la página
      const imageUrls = ['/get2knowsection.webp', '/logo-alternate.png'];
      await this.imageLoaderService.preloadImages(imageUrls);
    } catch (error) {
      console.error('Error loading images:', error);
    } finally {
      this.loadingService.stopLoading();
    }
  }
}

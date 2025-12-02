import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService, Product } from '../../services/product.service';
import { Footer } from '../footer/footer';
import { LoadingComponent } from '../loading/loading';
import { LoadingService } from '../../services/loading.service';
import { ImageLoaderService } from '../../services/image-loader.service';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, Footer, LoadingComponent],
  standalone: true,
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  protected loadingService = inject(LoadingService);
  private imageLoaderService = inject(ImageLoaderService);

  protected product: Product | undefined;
  protected selectedSize = signal<string>('');
  protected productName: string = '';
  protected productId: string = '';

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['productId'];
      console.log(id);

      this.loadingService.startLoading('Loading product...');

      this.productService.getProductById(id).subscribe({
        next: async (product) => {
          this.product = product;

          // Precargar imágenes del producto
          await this.imageLoaderService.preloadSingleProductImages(product, 'Loading images...');
        },
        error: (error) => {
          console.error('Error al cargar el producto:', error);
          this.loadingService.stopLoading();
        },
      });
    });
  }

  onSizeSelect(size: string): void {
    this.selectedSize.set(size);
  }

  //onConsultar(): void {
  // Aquí se puede implementar la lógica para contactar
  // console.log('Consultar producto:', this.product?.name, 'Talla:', this.selectedSize());
  //}
  onConsultar(): void {
    const phoneNumber = '59899373784'; // Número del negocio en formato internacional sin "+"

    const nombre = this.product?.name ?? 'Producto';
    const talle = this.selectedSize() ?? 'Sin talla';

    const mensaje = `Hola! Estoy interesado en la prenda "${nombre}" en talle ${talle}. ¿Está disponible?`;

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(mensaje)}`;

    window.open(url, '_blank');
  }
}

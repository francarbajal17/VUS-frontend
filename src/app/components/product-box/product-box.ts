import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-box.html',
  styleUrl: './product-box.css',
})
export class ProductBox {
  @Input() imageUrl: string = '';
  @Input() imageUrlBack: string = '';
  @Input() title: string = '';
  @Input() price: string = '';

  // Signal para controlar el estado del hover
  protected readonly isHovered = signal(false);

  // Método para manejar el hover
  onImageHover() {
    this.isHovered.set(true);
  }

  onImageLeave() {
    this.isHovered.set(false);
  }

  // Obtener la imagen actual basada en el estado del hover
  getCurrentImage(): string {
    if (this.isHovered() && this.imageUrlBack) {
      return this.imageUrlBack;
    }
    return this.imageUrl;
  }
}

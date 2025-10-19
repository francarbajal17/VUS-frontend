import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading.html',
  styleUrl: './loading.css',
})
export class LoadingComponent {
  @Input() message: string = 'Loading...';
  @Input() showVideo: boolean = false;
  @Input() videoSrc: string = '';

  protected readonly isVideoLoaded = signal<boolean>(false);

  /**
   * Maneja el evento cuando el video se ha cargado completamente
   */
  onVideoLoaded(): void {
    this.isVideoLoaded.set(true);
  }

  /**
   * Maneja errores en la carga del video
   */
  onVideoError(): void {
    console.warn('Error loading loading video, falling back to text animation');
    this.isVideoLoaded.set(false);
  }
}

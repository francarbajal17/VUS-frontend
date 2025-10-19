import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private readonly isLoading = signal<boolean>(false);
  private readonly loadingMessage = signal<string>('Loading...');

  /**
   * Observable del estado de carga
   */
  get isLoading$() {
    return this.isLoading.asReadonly();
  }

  /**
   * Observable del mensaje de carga
   */
  get loadingMessage$() {
    return this.loadingMessage.asReadonly();
  }

  /**
   * Inicia el estado de carga
   * @param message Mensaje opcional para mostrar durante la carga
   */
  startLoading(message: string = 'Loading...'): void {
    this.loadingMessage.set(message);
    this.isLoading.set(true);
  }

  /**
   * Detiene el estado de carga
   */
  stopLoading(): void {
    this.isLoading.set(false);
  }

  /**
   * Actualiza el mensaje de carga sin cambiar el estado
   * @param message Nuevo mensaje de carga
   */
  updateMessage(message: string): void {
    this.loadingMessage.set(message);
  }

  /**
   * Obtiene el estado actual de carga
   */
  getCurrentLoadingState(): boolean {
    return this.isLoading();
  }

  /**
   * Obtiene el mensaje actual de carga
   */
  getCurrentMessage(): string {
    return this.loadingMessage();
  }
}

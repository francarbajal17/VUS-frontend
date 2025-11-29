import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private readonly isLoading = signal<boolean>(false);
  private readonly loadingMessage = signal<string>('Loading...');
  private readonly minLoadingTime = signal<number>(2000); // 2 segundos por defecto
  private readonly enableMinLoadingTime = signal<boolean>(true); // Habilitado por defecto
  private loadingStartTime: number = 0;
  private pendingStopLoading: boolean = false;

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
    this.loadingStartTime = Date.now();
    this.pendingStopLoading = false;
  }

  /**
   * Detiene el estado de carga
   * Respeta el tiempo mínimo de loading si está habilitado
   */
  stopLoading(): void {
    if (!this.enableMinLoadingTime() || !this.isLoading()) {
      this.isLoading.set(false);
      return;
    }

    const elapsedTime = Date.now() - this.loadingStartTime;
    const remainingTime = this.minLoadingTime() - elapsedTime;

    if (remainingTime > 0) {
      this.pendingStopLoading = true;
      setTimeout(() => {
        if (this.pendingStopLoading) {
          this.isLoading.set(false);
          this.pendingStopLoading = false;
        }
      }, remainingTime);
    } else {
      this.isLoading.set(false);
    }
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

  /**
   * Configura el tiempo mínimo de loading en milisegundos
   * @param milliseconds Tiempo mínimo en ms (ej: 2000 para 2 segundos)
   */
  setMinLoadingTime(milliseconds: number): void {
    this.minLoadingTime.set(milliseconds);
  }

  /**
   * Obtiene el tiempo mínimo de loading actual
   */
  getMinLoadingTime(): number {
    return this.minLoadingTime();
  }

  /**
   * Habilita o deshabilita el tiempo mínimo de loading
   * @param enable true para habilitar, false para deshabilitar
   */
  setEnableMinLoadingTime(enable: boolean): void {
    this.enableMinLoadingTime.set(enable);
  }

  /**
   * Obtiene si el tiempo mínimo de loading está habilitado
   */
  isMinLoadingTimeEnabled(): boolean {
    return this.enableMinLoadingTime();
  }
}

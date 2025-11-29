import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Header } from '../components/header/header';
import { Hero } from '../components/hero/hero';
import { ProductCategory } from '../components/product-category/product-category';
import { GetToKnowUsComponent } from '../components/get-to-know-us/get-to-know-us';
import { Footer } from '../components/footer/footer';
import { LoadingComponent } from '../components/loading/loading';
import { LoadingService } from '../services/loading.service';
import { ImageLoaderService } from '../services/image-loader.service';

interface BackendResponse {
  [categoryName: string]: BackendItem[];
}

interface BackendItem {
  _id: string;
  name: string;
  category: {
    _id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  principalItem: boolean;
  sizes: string[];
  frontImage: string;
  backImage: string;
  section1LeftImage: string;
  section1RightImage: string;
  section2LeftImage: string;
  section2RightImage: string;
  price: number;
  drop: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

type ProductCategoryProduct = import('../components/product-category/product-category').Product;

function toDisplayProduct(item: BackendItem): ProductCategoryProduct {
  return {
    title: item.name,
    price: `UYU ${item.price}`,
    imageUrl: item.frontImage,
    imageUrlBack: item.backImage,
    id: item._id,
  };
}

function transformBackendData(data: BackendResponse): Record<string, ProductCategoryProduct[]> {
  const result: Record<string, ProductCategoryProduct[]> = {};
  for (const [categoryName, items] of Object.entries(data)) {
    result[categoryName] = items.map(toDisplayProduct);
  }
  return result;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    Header,
    Hero,
    ProductCategory,
    GetToKnowUsComponent,
    Footer,
    LoadingComponent,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  principalItems: Record<string, ProductCategoryProduct[]> = {};
  categoryNames: string[] = [];
  private http = inject(HttpClient);
  protected loadingService = inject(LoadingService);
  private imageLoaderService = inject(ImageLoaderService);

  ngOnInit(): void {
    this.fetchPrincipalItems();
  }

  fetchPrincipalItems(): void {
    this.loadingService.startLoading('Loading products...');

    this.http.get<BackendResponse>('https://vus-backend.vercel.app/api/principal-items').subscribe({
      next: async (data) => {
        this.principalItems = transformBackendData(data);
        console.log(this.principalItems);
        this.categoryNames = Object.keys(this.principalItems);

        // Precargar imágenes front/back de las cards de Home
        const allProducts = Object.values(this.principalItems).flat();
        await this.imageLoaderService.preloadHomeCardImages(allProducts, 'Loading images...');
      },
      error: (error) => {
        console.error('Error fetching principal items:', error);
        this.loadingService.stopLoading();
      },
    });
  }
}

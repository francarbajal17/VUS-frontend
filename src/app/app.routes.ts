import { Routes } from '@angular/router';
import { Home } from './home/home';
import { ProductDetail } from './components/product-detail/product-detail';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'products/:productName',
    component: ProductDetail,
  },
];

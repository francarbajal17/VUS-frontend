import { Routes } from '@angular/router';
import { Home } from './home/home';
import { ProductDetail } from './components/product-detail/product-detail';
import { PageGetToKnow } from './page-get-to-know/page-get-to-know';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'products/:productId',
    component: ProductDetail,
  },
  {
    path: 'get2knowvus',
    component: PageGetToKnow,
  },
];

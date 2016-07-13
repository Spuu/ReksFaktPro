import { provideRouter, RouterConfig } from '@angular/router';
import {CptyListComponent} from "./cpty/cpty-list.component";
import {CptyDetailFormComponent} from "./cpty/cpty-detail-form.component";
import {StoreListComponent} from "./store/store-list.component";
import {StoreDetailFormComponent} from "./store/store-detail-form.component";
import {ProductListComponent} from "./product/product-list.component";
import {ProductDetailFormComponent} from "./product/product-detail-form.component";

export const routes: RouterConfig = [
    { path: '', component: CptyListComponent },
    { path: 'cpty', component: CptyListComponent },
    { path: 'cpty/:id', component: CptyDetailFormComponent },
    { path: 'store', component: StoreListComponent },
    { path: 'store/:id', component: StoreDetailFormComponent },
    { path: 'product', component: ProductListComponent },
    { path: 'product/:id', component: ProductDetailFormComponent },
    { path: '*', component: CptyListComponent }
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes)
];
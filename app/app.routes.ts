import { provideRouter, RouterConfig } from '@angular/router';
import {CptyListComponent} from "./cpty/cpty-list.component";
import {CptyDetailFormComponent} from "./cpty/cpty-detail-form.component";
import {StoreListComponent} from "./store/store-list.component";
import {StoreDetailFormComponent} from "./store/store-detail-form.component";
import {ProductListComponent} from "./product/product-list.component";
import {ProductDetailRouterComponent} from "./product/product-detail-router.component";
import {InvoiceListComponent} from "./invoice/invoice-list.component";
import {InvoiceDetailFormComponent} from "./invoice/invoice-detail-form.component";
import {DummyComponent} from "./dummy.component";

export const routes: RouterConfig = [
    { path: '', component: DummyComponent },
    { path: 'cpty', component: CptyListComponent },
    { path: 'cpty/:id', component: CptyDetailFormComponent },
    { path: 'store', component: StoreListComponent },
    { path: 'store/:id', component: StoreDetailFormComponent },
    { path: 'product', component: ProductListComponent },
    { path: 'product/:id', component: ProductDetailRouterComponent },
    { path: 'invoice', component: InvoiceListComponent },
    { path: 'invoice/:id', component: InvoiceDetailFormComponent },
    { path: '*', component: CptyListComponent }
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes)
];
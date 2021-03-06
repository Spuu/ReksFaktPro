import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {DummyComponent} from "./dummy.component";
import {CptyListComponent} from "./cpty/cpty-list.component";
import {CptyDetailFormComponent} from "./cpty/cpty-detail-form.component";
import {StoreListComponent} from "./store/store-list.component";
import {StoreDetailFormComponent} from "./store/store-detail-form.component";
import {ProductListComponent} from "./product/product-list.component";
import {ProductDetailRouterComponent} from "./product/product-detail-router.component";
import {InvoiceListComponent} from "./invoice/invoice-list.component";
import {InvoiceDetailFormComponent} from "./invoice/invoice-detail-form.component";

const appRoutes: Routes = [
    { path: '', component: DummyComponent },
    { path: 'cpty', component: CptyListComponent },
    { path: 'cpty/:id', component: CptyDetailFormComponent },
    { path: 'store', component: StoreListComponent },
    { path: 'store/:id', component: StoreDetailFormComponent },
    { path: 'product', component: ProductListComponent },
    { path: 'product/:id', component: ProductDetailRouterComponent },
    { path: 'invoice', component: InvoiceListComponent },
    { path: 'invoice/:id', component: InvoiceDetailFormComponent }
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
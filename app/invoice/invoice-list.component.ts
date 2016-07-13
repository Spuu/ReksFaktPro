import {Component, OnInit}  from '@angular/core';
import {Router} from '@angular/router';

import {Invoice} from './invoice';
import {InvoiceService} from './invoice.service';
import {Logger} from "angular2-logger/core";

@Component({
    templateUrl: 'app/invoice/invoice-list.component.html'
})
export class InvoiceListComponent implements OnInit {
    pageTitle:string = 'Faktury';
    invoices:Invoice[];
    errorMessage:string;
    showNewForm:boolean = false;
    model:Invoice = new Invoice();

    constructor(private _invoiceService:InvoiceService,
                private _router:Router,
                private _logger:Logger) {

    }

    ngOnInit():void {
        this._invoiceService.getInvoices()
            .subscribe(
                invoices => this.invoices = invoices,
                error => this.errorMessage = <any>error);
    }

    onSelect(invoice:Invoice) {
        this._router.navigate(['/invoice', invoice._id]);
    }

    onSubmit() {
        this._invoiceService.postInvoice(this.model).subscribe(
            invoice => {
                this.invoices.push(invoice);
                this.model = new Invoice();
                this.showNewForm = false;
            },
            error => this.errorMessage = <any>error);
    }
}

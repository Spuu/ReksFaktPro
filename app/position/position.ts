import {Model} from "../generic/model";
import {Product} from "../product/product";
import {PositionSell} from "../position-sell/position-sell";

export class Position extends Model {
    _id:string = '';
    _store:string = '';
    _invoice:string = '';
    _product:string = '';
    _sell_position:PositionSell = null;
    index:number = 0;
    buy_netto_price:number = 0.0;
    sell_brutto_price:number = 0.0;
    quantity:number = 0.0;
    discount:number = 0;
    retail_rate:number = 0;

    // excluded from DB
    product:Product;
    toDelete:boolean = false;

    constructor(product:Product = null) {
        super();

        this.product = product;
    }

    setInputs(product:string, invoice:string, store:string) {
        this._product = product;
        this._invoice = invoice;
        this._store = store;
    }

    copyValues(pos:Position) {
        this.buy_netto_price = pos.buy_netto_price;
        this.sell_brutto_price = pos.sell_brutto_price;
        this.discount = pos.discount;
        this.retail_rate = pos.retail_rate;
    }

    prepareSellPosition(ps:PositionSell) {
        if(!this._sell_position) {
            this._sell_position = new PositionSell();
            this._sell_position._product = ps._product;
            this._sell_position.buy_netto_price = ps.buy_netto_price;
            this._sell_position.sell_brutto_price = ps.sell_brutto_price;
            this._sell_position.unit_nominator = ps.unit_nominator;
            this._sell_position.unit_denominator = ps.unit_denominator;
        }
    }
}
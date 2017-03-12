let request = require('supertest');
let SingleTest = require('../../utils/SingleTest');
let Identifiers = require('../../utils/Identifiers');
let Datasets = require('../../utils/Datasets');
let Counterparty = require('./../counterparty/CounterpartyCreation');

const INVOICE = 'invoice_';

class InvoiceCreation extends SingleTest {
    get defaults() {
        return {
            type: 'Buy'
        };
    }

    get datasets() {

        console.log(Counterparty.keyArti);

        let data = [
            // Czołgistów
            {
                _cpty: Identifiers.get(Counterparty.keyArti),
                name: 'Faktura Arti Czoł',
                _store: Identifiers.get('store_czołgistów'),
                document_date: new Date('2016-01-01')
                // updated type: 'Sell'
            },
            {
                _cpty: Identifiers.get('store_Czołgistów'),
                name: 'Faktura Zooleszcz Czoł',
                _store: Identifiers.get('store_staromiejska_40'),
                document_date: new Date('2016-03-01')
            },
            {
                _cpty: Identifiers.get('cpty_Eurozoo'),
                name: 'Faktura Eurozoo Czoł',
                _store: Identifiers.get('store_Czołgistów'),
                document_date: new Date('2016-06-01')
            },
            // Staromiejska 40
            {
                _cpty: Identifiers.get('cpty_arti'),
                name: 'Faktura Arti St40',
                _store: Identifiers.get('store_staromiejska_40'),
                document_date: new Date('2016-01-05')
            },
            {
                _cpty: Identifiers.get('cpty_zooleszcz'),
                name: 'Faktura Zooleszcz St40',
                _store: Identifiers.get('store_staromiejska_40'),
                document_date: new Date('2016-03-05')
            },
            {
                _cpty: Identifiers.get('cpty_eurozoo'),
                name: 'Faktura Eurozoo St40',
                _store: Identifiers.get('store_staromiejska_40'),
                document_date: new Date('2016-06-05')
            },
            // Słowackiego
            {
                _cpty: Identifiers.get('cpty_arti'),
                name: 'Faktura Arti Słow',
                _store: Identifiers.get('store_słowackiego'),
                document_date: new Date('2016-01-10')
            },
            {
                _cpty: Identifiers.get('cpty_zooleszcz'),
                name: 'Faktura Zooleszcz Słow',
                _store: Identifiers.get('store_słowackiego'),
                document_date: new Date('2016-03-10'),
                type: 'Sell'
            },
            {
                _cpty: Identifiers.get('cpty_eurozoo'),
                name: 'Faktura Eurozoo Słow',
                _store: Identifiers.get('store_słowackiego'),
                document_date: new Date('2016-06-10'),
                type: 'Sell'
            }
        ];

        // saved for update validation
        Datasets('invoice_arti', data[0]);
        return data;
    }

    apiCall(data, cb) {
        return request(SingleTest.apiURL)
            .post('/invoice')
            .send(data)
            .expect(200)
            .end(cb);
    }

    finalize(res) {
        super.finalize(res);

        res.creation_date.should.greaterThan(res.document_date);
        Identifiers.set(INVOICE + res.name, res._id);
    }
}

module.exports = new InvoiceCreation();

let Identifiers = require('../../../utils/Identifiers');
let CptyDesc = require('../counterparty/CounterpartyDescription');
let StoreDesc = require('../store/StoreDescription');

class InvoiceDescription {
    static get keyArti() {
        return this.datasets[0].name;
    }

    static get datasets() {
        return [
            // Czołgistów
            {
                store: Identifiers.store.get(StoreDesc.keyCz32),
                counterparty: Identifiers.counterparty.get(CptyDesc.keyArti),
                name: 'Faktura Arti Czoł',
                document_date: new Date('2016-01-01').toISOString()
                // updated type: 'Sell'
            },
            {
                store: Identifiers.store.get(StoreDesc.keyCz32),
                counterparty: Identifiers.counterparty.get(CptyDesc.keyZooleszcz),
                name: 'Faktura Zooleszcz Czoł',
                document_date: new Date('2016-03-01').toISOString()
            },
            {
                store: Identifiers.store.get(StoreDesc.keyCz32),
                counterparty: Identifiers.counterparty.get(CptyDesc.keyEurozoo),
                name: 'Faktura Eurozoo Czoł',
                document_date: new Date('2016-06-01').toISOString()
            },
            // Staromiejska 40
            {
                store: Identifiers.store.get(StoreDesc.keySt40),
                counterparty: Identifiers.counterparty.get(CptyDesc.keyArti),
                name: 'Faktura Arti St40',
                document_date: new Date('2016-01-05').toISOString()
            },
            {
                store: Identifiers.store.get(StoreDesc.keySt40),
                counterparty: Identifiers.counterparty.get(CptyDesc.keyZooleszcz),
                name: 'Faktura Zooleszcz St40',
                document_date: new Date('2016-03-05').toISOString()
            },
            {
                store: Identifiers.store.get(StoreDesc.keySt40),
                counterparty: Identifiers.counterparty.get(CptyDesc.keyEurozoo),
                name: 'Faktura Eurozoo St40',
                document_date: new Date('2016-06-05').toISOString()
            },
            // Słowackiego
            {
                store: Identifiers.store.get(StoreDesc.keySlow),
                counterparty: Identifiers.counterparty.get(CptyDesc.keyArti),
                name: 'Faktura Arti Słow',
                document_date: new Date('2016-01-10').toISOString()
            },
            {
                store: Identifiers.store.get(StoreDesc.keySlow),
                counterparty: Identifiers.counterparty.get(CptyDesc.keyZooleszcz),
                name: 'Faktura Zooleszcz Słow',
                document_date: new Date('2016-03-10').toISOString(),
                type: 'Sell'
            },
            {
                store: Identifiers.store.get(StoreDesc.keySlow),
                counterparty: Identifiers.counterparty.get(CptyDesc.keyEurozoo),
                name: 'Faktura Eurozoo Słow',
                document_date: new Date('2016-06-10').toISOString(),
                type: 'Sell'
            }
        ];
    }
}

module.exports = InvoiceDescription;
Ext.define('Mock.store.ItineraryMock', {
    extend: 'Ext.data.Store',
    alternateClassName: ['FB.store.Itinerary'],
    storeId: 'Itinerary',
    requires: 'FB.model.Itinerary',
    model: 'FB.model.Itinerary',
    proxy: {
        url: 'base/test/client/mock/data/flights.json',
        type: 'ajax',
        reader: {
            type: 'json'
        }
    }
});


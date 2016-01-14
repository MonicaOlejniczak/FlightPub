Ext.define('Mock.store.AirportMock', {
    extend: 'Ext.data.Store',
    alternateClassName: ['FB.store.Airport'],
    model: 'FB.model.Airport',
    storeId: 'Airport',
    data: [
        {name: 'Sydney', code: 'SYD', latitude: 12.60, longitude: -60.12},
        {name: 'Canberra', code: 'CBR', latitude: 0.07, longitude: 7.00}
    ]
});


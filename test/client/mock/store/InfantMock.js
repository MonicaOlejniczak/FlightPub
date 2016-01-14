Ext.define('Mock.store.InfantMock', {
    extend: 'Ext.data.Store',
    alternateClassName: ['FB.store.Infant'],
    storeId: 'Infant',
    fields: [
        'name',
        'value'
    ],
    data: [
        {name: '0 Infants', value: 1},
        {name: '1 Infant', value: 1},
        {name: '2 Infants', value: 2},
        {name: '3 Infants', value: 3},
        {name: '4 Infants', value: 4},
        {name: '5 Infants', value: 5}
    ]
});


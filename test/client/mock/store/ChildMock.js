Ext.define('Mock.store.ChildMock', {
    extend: 'Ext.data.Store',
    alternateClassName: ['FB.store.Child'],
    storeId: 'Child',
    fields: [
        'name',
        'value'
    ],
    data: [
        {name: '0 Children', value: 1},
        {name: '1 Child', value: 1},
        {name: '2 Children', value: 2},
        {name: '3 Children', value: 3},
        {name: '4 Children', value: 4},
        {name: '5 Children', value: 5}
    ]
});


Ext.define('Mock.store.AccountTypeMock', {
    extend: 'Ext.data.Store',
    alternateClassName: ['FB.store.AccountType'],
    storeId: 'AccountType',
    fields: [
        'type'
    ],
    data: [{
        type: 'Standard User'
    },  {
        type: 'Travel Agent'
    },  {
        type: 'Site Manager'
    }]
});


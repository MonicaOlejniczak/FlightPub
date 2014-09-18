Ext.define('Mock.store.TicketTypeMock', {
    extend: 'Ext.data.Store',
    alternateClassName: ['FB.store.TicketType'],
    storeId: 'TicketType',
    fields: [
        'name'
    ],
    data: [{
        name: 'Economy'
    },  {
        name: 'Premium Economy'
    },  {
        name: 'Business Class'
    },  {
        name: 'First Class'
    }]
});


Ext.define('Mock.store.LuggageTypeMock', {
    extend: 'Ext.data.Store',
    alternateClassName: ['FB.store.LuggageType'],
    storeId: 'LuggageType',
    fields: [
        'name',
        'value'
    ],
    data: [{
        name: 'Only Carry-On Luggage',
        value: 'CARRY_ON'
    },  {
        name: 'Carry-On Plus Checked Baggage',
        value: 'CHECKED'
    }]
});


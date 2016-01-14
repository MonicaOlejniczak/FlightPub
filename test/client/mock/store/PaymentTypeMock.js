Ext.define('Mock.store.PaymentTypeMock', {
    extend: 'Ext.data.Store',
    alternateClassName: ['FB.store.PaymentType'],
    storeId: 'PaymentType',
    fields: [
        'option'
    ],
    data: [{
        option: 'Visa'
    },  {
        option: 'Mastercard'
    },  {
        option: 'PayPal'
    }]
});


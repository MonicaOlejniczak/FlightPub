/**
 * @author Monica Olejniczak
 */
Ext.define('FB.store.PaymentType', {
	extend: 'Ext.data.Store',
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
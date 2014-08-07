/**
 * @author Monica Olejniczak
 */
Ext.define('FB.view.account.details.payment.PaymentDetails', {
    extend: 'FB.view.account.details.Details',
	xtype: 'PaymentDetails',
	requires: [
		'FB.view.account.details.payment.PaymentMethod',
		'FB.view.account.details.payment.CardName',
		'FB.view.account.details.payment.CardNumber',
		'FB.view.account.details.payment.PayPalUsername'
	],
	itemId: 'paymentDetails',
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	items: [{
		xtype: 'PaymentMethod'
	},  {
		xtype: 'CardName'
	},  {
		xtype: 'CardNumber'
	},  {
		xtype: 'PayPalUsername'
	}]
});

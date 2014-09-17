/**
 * @author Monica Olejniczak
 */
Ext.define('FB.view.account.details.payment.PaymentDetails', {
    extend: 'FB.view.account.details.Details',
	xtype: 'PaymentDetails',
	requires: [
		'FB.view.account.details.payment.PaymentMethod'
	],
	itemId: 'paymentDetails',
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	items: [{
		xtype: 'PaymentMethod'
	}]
});

/**
 * @author Monica Olejniczak
 */
Ext.define('FB.view.account.details.payment.PayPalUsername', {
	extend: 'Ext.form.field.Text',
	xtype: 'PayPalUsername',
	itemId: 'ppUsername',
	name: 'ppUsername',
	fieldLabel: 'PayPal username',
	emptyText: 'please enter your paypal username'
});

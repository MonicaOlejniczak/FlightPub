/**
 * @author Monica Olejniczak
 */
Ext.define('FB.view.account.details.payment.CardNumber', {
	extend: 'Ext.form.field.Number',
	xtype: 'CardNumber',
	itemId: 'cardNumber',
	name: 'cardNumber',
	fieldLabel: 'Card number',
	emptyText: 'please enter the card number',
	minValue: 0
});

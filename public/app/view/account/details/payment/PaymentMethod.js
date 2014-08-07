/**
 * @author Monica Olejniczak
 */
Ext.define('FB.view.account.details.payment.PaymentMethod', {
	extend: 'Ext.form.field.ComboBox',
	xtype: 'PaymentMethod',
	itemId: 'paymentMethod',
	cls: 'paymentMethod',
	name: 'paymentMethod',
	fieldLabel: 'Preferred payment method',
	store: 'PaymentType',
	displayField: 'option',
	valueField: 'option',
	emptyText: 'please select a payment option',
	editable: false,
	hideTrigger: false
});

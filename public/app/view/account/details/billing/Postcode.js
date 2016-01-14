/**
 * @author Monica Olejniczak
 */
Ext.define('FB.view.account.details.billing.Postcode', {
	extend: 'Ext.form.field.Number',
	xtype: 'Postcode',
	itemId: 'postcode',
	name: 'postcode',
	fieldLabel: 'Postcode',
	emptyText: 'please enter your postcode',
	minValue: 0
});

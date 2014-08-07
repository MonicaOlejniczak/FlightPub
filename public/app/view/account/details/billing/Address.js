/**
 * @author Monica Olejniczak
 */
Ext.define('FB.view.account.details.billing.Address', {
	extend: 'Ext.form.field.Text',
	xtype: 'Address',
	itemId: 'address',
	name: 'streetAddress',
	fieldLabel: 'Address',
	emptyText: 'please enter your postal address'
});

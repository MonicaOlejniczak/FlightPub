/**
 * @author Monica Olejniczak
 */
Ext.define('FB.view.account.details.billing.Country', {
	extend: 'Ext.form.field.Text',
	xtype: 'Country',
	itemId: 'country',
	name: 'country',
	fieldLabel: 'Country',
	emptyText: 'please enter the country you currently live in',
    minLength: 4,
    maxLength: 75
});

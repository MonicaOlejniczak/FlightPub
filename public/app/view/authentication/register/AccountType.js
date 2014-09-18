/**
 * @author Monica Olejniczak
 */
Ext.define('FB.view.authentication.register.AccountType', {
	extend: 'Ext.form.field.ComboBox',
	xtype: 'AccountType',
	itemId: 'accountType',
	cls: 'accountType',
	name: 'accountType',
	fieldLabel: 'Account type',
	store: 'AccountType',
	displayField: 'type',
	valueField: 'type',
	value: 'Standard User',
	emptyText: 'please select an account type',
	editable: false,
	border: false,
    allowBlank: false
});

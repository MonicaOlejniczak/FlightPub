/**
 * @author Monica Olejniczak
 */
Ext.define('FB.view.account.details.personal.FirstName', {
	extend: 'Ext.form.field.Text',
	xtype: 'FirstName',
	itemId: 'firstName',
	name: 'firstName',
	fieldLabel: 'First name',
	emptyText: 'please enter your first name',
	allowBlank: false,
	maxLength: 30
});

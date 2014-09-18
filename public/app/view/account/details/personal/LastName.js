/**
 * @author Monica Olejniczak
 */
Ext.define('FB.view.account.details.personal.LastName', {
	extend: 'Ext.form.field.Text',
	xtype: 'LastName',
	itemId: 'lastName',
	name: 'lastName',
	emptyText: 'please enter your last name',
	allowBlank: false,
	maxLength: 30
});

/**
 * @author Monica Olejniczak
 */
Ext.define('FB.view.account.details.account.Email', {
	extend: 'Ext.form.field.Text',
	xtype: 'Email',
	itemId: 'email',
	name: 'email',
	fieldLabel: 'Email',
	vtype: 'email',
	emptyText: 'please enter your email address',
	allowBlank: false,
	maxLength: 30
});

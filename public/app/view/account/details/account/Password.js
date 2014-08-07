/**
 * @author Monica Olejniczak
 */
Ext.define('FB.view.account.details.account.Password', {
	extend: 'Ext.form.field.Text',
	xtype: 'Password',
	itemId: 'password',
	name: 'password',
	fieldLabel: 'Password',
	inputType: 'password',
	minLength: 8
});

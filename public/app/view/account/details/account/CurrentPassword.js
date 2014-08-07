/**
 * @author Monica Olejniczak
 */
Ext.define('FB.view.account.details.account.CurrentPassword', {
	extend: 'FB.view.account.details.account.Password',
	xtype: 'CurrentPassword',
	itemId: 'password',
	name: 'password',
	fieldLabel: '* Current password',
	emptyText: 'please enter your current password',
	allowBlank: false
});

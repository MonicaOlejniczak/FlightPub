/**
 * @author Monica Olejniczak
 */
Ext.define('FB.view.account.details.account.AccountDetails', {
    extend: 'FB.view.account.details.Details',
	xtype: 'AccountDetails',
	requires: [
		'FB.view.account.details.account.Email',
		'FB.view.account.details.account.CurrentPassword',
		'FB.view.account.details.account.NewPassword',
		'FB.view.account.details.account.ConfirmPassword'
	],
	itemId: 'accountDetails',
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	items: [{
		xtype: 'Email'
	},  {
		xtype: 'CurrentPassword'
	},  {
		xtype: 'NewPassword'
	},  {
		xtype: 'ConfirmPassword'
	}]
});

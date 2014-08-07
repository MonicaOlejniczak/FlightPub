/**
 * @author Monica Olejniczak
 */
Ext.define('FB.view.authentication.register.Register', {
	extend: 'Ext.form.Panel',
	requires: [
		'Ext.form.field.ComboBox',
		'FB.view.account.details.personal.FirstName',
		'FB.view.account.details.personal.LastName',
		'FB.view.authentication.register.AccountType',
		'FB.view.account.details.account.Email',
		'FB.view.account.details.account.Password',
        'FB.view.account.details.account.ConfirmPassword',
		'FB.view.authentication.register.RegisterController'
	],
	xtype: 'Register',
	controller: 'Register',
	itemId: 'Register',
	standardSubmit: true,
	baseCls: 'x-plain',
	cls: 'smallerContent',
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	defaults: {
		labelWidth: 200,
		msgTarget: 'under'
	},
	items: [{
		xtype: 'FirstName'
	},  {
		xtype: 'LastName'
	},  {
		xtype: 'AccountType'
	},  {
		xtype: 'Email'
	},  {
		xtype: 'Password',
		emptyText: 'please enter a password',
		allowBlank: false
	},  {
		xtype: 'ConfirmPassword'
	},  {
		xtype: 'container',
		layout: {
			type: 'hbox',
			pack: 'end'
		},
		margin: '5px 0 0 0',
		items: [{
			xtype: 'button',
			itemId: 'cancel',
			text: 'Cancel',
			cls: 'button-red',
			margin: '0 5px 0 0'
		},  {
			xtype: 'button',
			itemId: 'register',
			text: 'Register',
			cls: 'button-blue'
		}]
	}]
});

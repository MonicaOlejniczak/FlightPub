/**
 * @author Monica Olejniczak
 */
Ext.define('FB.view.authentication.login.Login', {
	extend: 'Ext.form.Panel',
	requires: [
		'FB.view.account.details.account.Email',
		'FB.view.account.details.account.Password',
		'FB.view.authentication.login.LoginController'
	],
	xtype: 'Login',
	controller: 'Login',
	itemId: 'Login',
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
		xtype: 'Email',
		emptyText: 'please enter the email address associated with your account'
	},  {
		xtype: 'Password',
        emptyText: 'please enter the password associated with your account',
		allowBlank: false
	},  {
		xtype: 'container',
		itemId: 'buttons',
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
			itemId: 'login',
			text: 'Login',
			cls: 'button-blue'
		}]
	}]
});

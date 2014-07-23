Ext.define('FB.view.authentication.Login', {
	extend: 'Ext.form.Panel',
	requires: [
		'Ext.form.Panel',
		'FB.view.authentication.LoginController'
	],
	xtype: 'Login',
	controller: 'Login',
	itemId: 'Login',
	standardSubmit: true,
	layout: {
		type: 'anchor'
	},
	cls: 'smallerContent',
	baseCls: 'x-plain',
	defaults: {
		anchor: '100%',
		xtype: 'textfield',
		labelWidth: 200,
		maxLength: 50,
		msgTarget: 'under',
		allowBlank: false,
		span: 1
	},
	items: [{
		itemId: 'email',
		name: 'email',
		fieldLabel: 'Email',
		vtype: 'email',
		emptyText: 'please enter the email address associated with your account'
	},  {
		itemId: 'password',
		name: 'password',
		fieldLabel: 'Password',
		inputType: 'password',
		emptyText: 'please enter the password associated with your account',
		minLength: 8
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
			cls: 'cancelButton',
			margin: '0 5px 0 0'
		},  {
			xtype: 'button',
			itemId: 'login',
			text: 'Login',
			cls: 'button'
		}]
	}]
});

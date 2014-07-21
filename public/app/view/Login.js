Ext.define('FB.view.Login', {
	extend: 'Ext.form.Panel',
	requires: [
		'FB.view.LoginController'
	],
	xtype: 'Login',
	controller: 'Login',
	standardSubmit: true,
	layout: {
		type: 'anchor'
	},
	cls: 'x-plain',
	baseCls: 'x-plain',
	defaults: {
		anchor: '100%',
		xtype: 'textfield',
		span: 1,
		labelWidth: 200,
		maxLength: 50,
		msgTarget: 'under',
		allowBlank: false
	},
	items: [{
		itemId: 'email',
		name: 'email',
		fieldLabel: 'Email',
		inputType: 'email',
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
		layout: {
			type: 'hbox',
			pack: 'end'
		},
		margin: '5px 0 0 0',
		defaults: {
			xtype: 'button',
			scale: 'large'
		},
		items: [{
			action: 'cancel',
			text: 'Cancel',
			cls: 'cancelButton',
			margin: '0 5px 0 0'
		},  {
			action: 'submit',
			text: 'Login',
			cls: 'button'
		}]
	}]
});

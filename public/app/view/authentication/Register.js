Ext.define('FB.view.authentication.Register', {
	extend: 'Ext.form.Panel',
	requires: [
		'Ext.form.Panel',
		'Ext.form.field.ComboBox',
		'FB.view.authentication.RegisterController'
	],
	xtype: 'Register',
	controller: 'Register',
	itemId: 'Register',
	standardSubmit: true,
	layout: {
		type: 'anchor'
	},
	cls: 'smallerContent',
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
		itemId: 'firstName',
		name: 'firstName',
		fieldLabel: 'First name',
		emptyText: 'please enter your first name',
		maxLength: 30
	},  {
		itemId: 'lastName',
		name: 'lastName',
		fieldLabel: 'Last name',
		emptyText: 'please enter your last name',
		maxLength: 30
	},  {
		itemId: 'accountType',
		xtype: 'combobox',
		cls: 'accountType',
		name: 'accountType',
		fieldLabel: 'Account type',
		store: 'AccountType',
		displayField: 'type',
		valueField: 'type',
		value: 'Standard User',
		emptyText: 'please select an account type',
		editable: false,
		border: false
	},  {
		itemId: 'email',
		name: 'email',
		fieldLabel: 'Email',
		vtype: 'email',
		emptyText: 'please enter your email address'
	},  {
		itemId: 'password',
		name: 'password',
		fieldLabel: 'Password',
		inputType: 'password',
		emptyText: 'please enter a password',
		minLength: 8
	},  {
		itemId: 'confirmPassword',
		fieldLabel: 'Confirm password',
		inputType: 'password',
		emptyText: 'please confirm your password',
		minLength: 8
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
			cls: 'cancelButton',
			margin: '0 5px 0 0'
		},  {
			xtype: 'button',
			itemId: 'register',
			text: 'Register',
			cls: 'button'
		}]
	}]
});

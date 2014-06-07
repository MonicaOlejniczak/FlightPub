Ext.define('FB.view.AccountSettings', {
	extend: 'Ext.form.Panel',
	alias: 'widget.accountSettingsForm',
	renderTo: 'accountSettings',
	url: '/account/process',
	method: 'post',
	standardSubmit: true,
	layout: {
		type: 'anchor'
	},
	cls: 'x-plain',
	baseCls: 'x-plain',
	defaults: {
		anchor: '100%',
		xtype: 'textfield',
		labelWidth: 200
	},
	items: [{
		xtype: 'header',
		html: 'Personal details',
		cls: 'formHeading'
	},  {
		itemId: 'firstName',
		name: 'firstName',
		fieldLabel: 'First name',
		maxLength: 50
	},  {
		itemId: 'lastName',
		name: 'lastName',
		fieldLabel: 'Last name',
		maxLength: 50
	},  {
		itemId: 'email',
		name: 'email',
		fieldLabel: 'Email',
		inputType: 'email'
	},  {
		itemId: 'currentPassword',
		name: 'currentPassword',
		fieldLabel: '* Current password',
		inputType: 'password',
		emptyText: "please enter your current password",
		allowBlank: false,
		msgTarget: 'under'
	},  {
		itemId: 'newPassword',
		name: 'newPassword',
		fieldLabel: 'New password',
		inputType: 'password',
		emptyText: "please enter your new password",
		msgTarget: 'under'
	},  {
		itemId: 'confirmPassword',
		fieldLabel: 'Confirm new password',
		inputType: 'password',
		emptyText: "please enter your new password again",
		msgTarget: 'under'
	}],
	buttons: [{
		action: 'cancel',
		text: 'Cancel',
		cls: 'cancelButton',
		scale: 'large'
	},  {
		action: 'submit',
		text: 'Update Details',
		cls: 'button',
		scale: 'large',
		width: 120
	}]
});

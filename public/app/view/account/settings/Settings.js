/**
 * @author Monica Olejniczak
 */
Ext.define('FB.view.account.settings.Settings', {
	extend: 'Ext.form.Panel',
	requires: [
		'FB.view.account.settings.Heading',
		'FB.view.account.details.account.AccountDetails',
		'FB.view.account.details.personal.PersonalDetails',
		'FB.view.account.details.billing.BillingDetails',
		'FB.view.account.details.payment.PaymentDetails',
		'FB.view.account.settings.SettingsController'
	],
	xtype: 'AccountSettings',
	controller: 'AccountSettings',
	itemId: 'AccountSettings',
	standardSubmit: true,
	baseCls: 'x-plain',
	cls: 'smallerContent',
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	items: [{
		xtype: 'AccountSettingsHeading',
		html: 'Account settings'
	},  {
		xtype: 'AccountDetails'
	},  {
		xtype: 'AccountSettingsHeading',
		html: 'Personal details'
	},  {
		xtype: 'PersonalDetails'
	},  {
		xtype: 'AccountSettingsHeading',
		html: 'Billing information'
	},  {
		xtype: 'BillingDetails'
	},  {
		xtype: 'AccountSettingsHeading',
		html: 'Payment details'
	},  {
		xtype: 'PaymentDetails'
	},  {
		xtype: 'container',
		layout: {
			type: 'hbox',
			pack: 'end'
		},
		margin: '5px 0 0 0',
		defaults: {
			xtype: 'button'
		},
		items: [{
			itemId: 'cancel',
			text: 'Cancel',
			cls: 'button-red',
			margin: '0 5px 0 0'
		},  {
			itemId: 'updateDetails',
			text: 'Update Details',
			cls: 'button-blue'
		}]
	}]
});

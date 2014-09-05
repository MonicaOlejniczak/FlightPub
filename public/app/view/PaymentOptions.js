Ext.define('FB.view.PaymentOptions', {
	extend: 'Ext.form.Panel',
	alias: 'widget.PaymentOptions',
	standardSubmit: true,
	layout: {
		type: 'anchor'
	},
	cls: 'x-plain',
	baseCls: 'x-plain',
	defaults: {
		anchor: '100%',
		xtype: 'textfield',
		labelWidth: 200,
		maxLength: 50,
		msgTarget: 'under',
		border: false,
		hideTrigger: true,
		keyNavEnabled: false,
		mouseWheelEnabled: false,
		allowBlank: false
	},
	items: [{
		xtype: 'header',
		html: 'Personal details',
		cls: 'formHeading'
	},  {
		itemId: 'firstName',
		name: 'firstName',
		fieldLabel: 'First name',
		emptyText: 'please enter your first name'
	},  {
		itemId: 'lastName',
		name: 'lastName',
		fieldLabel: 'Last name',
		emptyText: 'please enter your last name'
	},  {
		itemId: 'phoneNumber',
		xtype: 'numberfield',
		name: 'phoneNumber',
		fieldLabel: 'Phone number',
		emptyText: 'please enter your phone number',
		minValue: 0
	},  {
		xtype: 'header',
		html: 'Billing information',
		cls: 'formHeading'
	},  {
		itemId: 'address',
		name: 'streetAddress',
		fieldLabel: 'Address',
		emptyText: 'please enter your postal address'
	},  {
		itemId: 'suburb',
		name: 'suburb',
		fieldLabel: 'Suburb',
		emptyText: 'please enter your postal suburb'
	},  {
		itemId: 'country',
		name: 'country',
		fieldLabel: 'Country',
		emptyText: 'please enter the country you currently live in'
	},  {
		itemId: 'state',
		name: 'state',
		fieldLabel: 'State',
		emptyText: 'please enter the state you live in'
	},  {
		itemId: 'postcode',
		xtype: 'numberfield',
		name: 'postcode',
		fieldLabel: 'Postcode',
		emptyText: 'please enter your postcode',
		minValue: 0
	},  {
		xtype: 'header',
		html: 'Payment details',
		cls: 'formHeading'
	},  {
		itemId: 'paymentMethod',
		xtype: 'combobox',
		cls: 'paymentMethod',
		name: 'paymentMethod',
		fieldLabel: 'Preferred payment method',
		store: Ext.create('Ext.data.Store', {
			fields: [
				'option'
			],
			data : [
				{'option': 'Visa'},
				{'option': 'Mastercard'},
				{'option': 'PayPal'}
			]
		}),
		displayField: 'option',
		valueField: 'option',
		emptyText: 'please select a payment option',
		editable: false,
		hideTrigger: false
	},  {
		itemId: 'cardName',
		name: 'cardName',
		fieldLabel: 'Card name',
		emptyText: 'please enter the name on the card'
	},  {
		itemId: 'cardNumber',
		xtype: 'numberfield',
		name: 'cardNumber',
		fieldLabel: 'Card number',
		emptyText: 'please enter the card number',
		minValue: 0
	},  {
		itemId: 'ppUsername',
		name: 'ppUsername',
		fieldLabel: 'PayPal username',
		emptyText: 'please enter your paypal username'
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
			text: 'Update Details',
			cls: 'button'
		}]
	}]
});
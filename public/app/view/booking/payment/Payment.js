/**
 * @author Monica Olejniczak
 */
Ext.define('FB.view.booking.payment.Payment', {
	extend: 'Ext.form.Panel',
	requires: [
		'Ext.Component',
		'FB.view.booking.payment.Heading',
		'FB.view.account.details.personal.PersonalDetails',
		'FB.view.account.details.billing.BillingDetails',
		'FB.view.account.details.payment.PaymentDetails',
		'FB.view.booking.payment.PaymentController'
	],
	xtype: 'Payment',
	controller: 'Payment',
	standardSubmit: true,
	baseCls: 'x-plain',
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	items: [{
		xtype: 'component',
		html: 'Please fill out the following form to book your flight.',
		margin: '0 0 5px 300px',
		style: {
			'text-align': 'center'
		}
	},  {
		xtype: 'PaymentHeading',
		html: 'Personal details'
	},  {
		xtype: 'PersonalDetails',
        defaults: {
            allowBlank: false
        }
	},  {
		xtype: 'PaymentHeading',
		html: 'Billing information'
	},  {
		xtype: 'BillingDetails',
        defaults: {
            allowBlank: false
        }
	},  {
		xtype: 'PaymentHeading',
		html: 'Payment details'
	},  {
		xtype: 'PaymentDetails',
        defaults: {
            allowBlank: false
        }
	}]
});

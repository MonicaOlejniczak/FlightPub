/**
 * @author Monica Olejniczak
 */
Ext.define('FB.view.account.details.billing.BillingDetails', {
    extend: 'FB.view.account.details.Details',
	xtype: 'BillingDetails',
	requires: [
		'FB.view.account.details.billing.Address',
		'FB.view.account.details.billing.Suburb',
		'FB.view.account.details.billing.Postcode',
		'FB.view.account.details.billing.Country',
		'FB.view.account.details.billing.State'
	],
	itemId: 'billingDetails',
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
    defaults: {
        maxLength: 30
    },
	items: [{
		xtype: 'Address'
	},  {
		xtype: 'Suburb'
	},  {
		xtype: 'Postcode'
	},  {
		xtype: 'Country'
	},  {
		xtype: 'State'
	}]
});

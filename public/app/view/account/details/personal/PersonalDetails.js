/**
 * @author Monica Olejniczak
 */
Ext.define('FB.view.account.details.personal.PersonalDetails', {
	extend: 'FB.view.account.details.Details',
	xtype: 'PersonalDetails',
	requires: [
		'FB.view.account.details.personal.FirstName',
		'FB.view.account.details.personal.LastName',
		'FB.view.account.details.personal.PhoneNumber'
	],
	itemId: 'personalDetails',
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	items: [{
		xtype: 'FirstName'
	},  {
		xtype: 'LastName'
	},  {
		xtype: 'PhoneNumber'
	}]
});

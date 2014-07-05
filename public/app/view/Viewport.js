Ext.define('FB.view.Viewport', {
	extend: 'Ext.container.Viewport',
	requires: [
		'Ext.layout.container.Border',
		'FB.view.layout.Header',
		'FB.view.layout.Footer',
		'FB.view.AccountSettings',
		'FB.view.Flights',
		'FB.view.Home',
		'FB.view.Login',
		'FB.view.Luggage',
		'FB.view.PaymentOptions',
		'FB.view.Register',
		'FB.view.SeatSelection',
		'FB.view.Tickets'
	],
	layout: {
		type: 'border'
	},
	items: [{
		xtype: 'layout.Header'
	},  {
		xtype: 'layout.Footer'
	}]
});

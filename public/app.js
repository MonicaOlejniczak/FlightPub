Ext.syncRequire('Ext.app.Application');
//Ext.create('FB.Application');
//todo fix error and move to application.js
Ext.application({
	name: 'FB',
	paths: {
		'FB': '/assets/app'
	},
	requires: [
		'FB.view.Viewport'
	],
	stores: [
		'AccountType',
		'Adult',
		'Airline',
		'Airport',
		'Child',
		'Flight',
		'Infant',
		'Itinerary',
		'LuggageTypes',
		'PaymentType',
		'TicketTypes'
	],
	/**
	 * This method is called when the application boots
	 */
	init: function () {
		window._FB = this;
	},
	/**
	 * This method is called when the page has loaded
	 */
	launch: function () {
		Ext.create('FB.view.Viewport');
	}
});
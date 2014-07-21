//Ext.syncRequire('FB.Application');
//Ext.create('FB.Application');
//todo fix error and move to application.js
Ext.application({
	name: 'FB',
	paths: {
		'FB': '/assets/app'
	},
	requires: [
		'FB.view.Viewport',
		'FB.view.Home'
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
		'PaymentType'
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
		// create application wide variables for the viewport and content
		var viewport = Ext.create('FB.view.Viewport');
		var content = viewport.down('[region=center]').controller;
		this.viewport = viewport;
		this.content = content;
		// change the content to the home page
		content.setPage('Home', 'Home');
	}
});
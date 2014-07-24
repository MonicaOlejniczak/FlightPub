Ext.define('FB.view.booking.flights.Sort', {
	extend: 'Ext.container.Container',
	requires: [
		'Ext.container.Container',
		'Ext.button.Button',
		'FB.view.booking.flights.SortController'
	],
	xtype: 'FlightsSort',
	controller: 'FlightsSort',
	html: 'SORT BY',
	cls: 'sort',
	defaults: {
		xtype: 'button',
		baseCls: 'x-btn-plain'
	},
	items: [{
		itemId: 'price',
		text: 'Price'
	},  {
		itemId: 'duration',
		text: 'Duration'
	},  {
		itemId: 'departureTime',
		text: 'Departure Time'
	},  {
		itemId: 'arrivalTime',
		text: 'Arrival Time'
	},  {
		itemId: 'stopOvers',
		text: 'Number of stop-overs'
	}]
});

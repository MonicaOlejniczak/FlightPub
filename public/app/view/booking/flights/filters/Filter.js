/**
 * @author Monica Olejniczak
 */
Ext.define('FB.view.booking.flights.filters.Filter', {
	extend: 'Ext.container.Container',
	requires: [
		'Ext.button.Button',
		'FB.view.booking.flights.filters.FilterController'
	],
	xtype: 'FlightsFilter',
	controller: 'FlightsFilter',
	html: 'FILTER BY',
	cls: 'filter',
	defaults: {
		xtype: 'button',
		baseCls: 'x-btn-plain'
	},
	items: [{
		itemId: 'none',
		text: 'None'
	},  {
		itemId: 'price',
		text: 'Price'
	},  {
		itemId: 'duration',
		text: 'Duration'
	},  {
		itemId: 'stopOvers',
		text: 'Number of stop-overs'
	}]
});

/**
 * @author Monica Olejniczak
 */
Ext.define('FB.view.booking.flights.sort.Sort', {
    extend: 'Ext.container.Container',
	requires: [
        'Ext.Component',
		'Ext.button.Button',
		'FB.view.booking.flights.sort.SortController'
	],
	xtype: 'FlightsSort',
	controller: 'FlightsSort',
    layout: 'hbox',
    cls: 'sort',
    items: [{
        xtype: 'component',
        html: 'Sort by',
        cls: 'sortText'
    },  {
        xtype: 'container',
        layout: 'hbox',
        defaults: {
            xtype: 'button',
            baseCls: 'x-btn-plain',
            cls: 'sortButton'
        },
        items: [{
            itemId: 'price',
            html: 'Price'
        },  {
            itemId: 'duration',
            html: 'Duration'
        },  {
            itemId: 'departureTime',
            html: 'Departure Time'
        },  {
            itemId: 'arrivalTime',
            html: 'Arrival Time'
        },  {
            itemId: 'stopOvers',
            html: 'Number of stop-overs'
        }]
    }]
});

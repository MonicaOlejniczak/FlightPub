/**
 * @author Monica Olejniczak
 */
Ext.define('FB.view.booking.flights.Flights', {
	extend: 'Ext.container.Container',
	requires: [
		'Ext.Component',
        'FB.view.booking.flights.sort.Sort',
        'FB.view.booking.flights.FlightsController'
	],
	xtype: 'Flights',
	controller: 'Flights',
	config: {
		flightDetails: null
	},
    items: [{
        xtype: 'container',
        layout: {
            type: 'hbox',
            pack: 'end'
        },
        items: [{
            xtype: 'FlightsSort',
            itemId: 'sort'
        }]
    },  {
        xtype: 'component',
        itemId: 'information',
        tpl: '{information}',
        margin: '10px 0 10px 0'
    },  {
        xtype: 'container',
        itemId: 'itineraries',
        layout: {
            type: 'vbox'
        },
        autoScroll: true,
        items: [{
            layout: {
                type: 'hbox',
                align: 'stretch'
            }
        }]
    }]
});

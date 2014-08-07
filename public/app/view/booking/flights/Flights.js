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
            span: 1,
            margin: '0 10px 0 0'
        },  {
            xtype: 'FlightsSort',
            span: 1
        }]
    },  {
        xtype: 'component',
        itemId: 'information',
        tpl: '{information}',
        margin: '10px 0 10px 0'
    },  {
        xtype: 'container',
        itemId: 'flights',
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

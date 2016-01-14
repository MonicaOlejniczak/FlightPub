/**
 * @author Monica Olejniczak
 */
Ext.define('FB.view.booking.flights.display.Itinerary', {
	extend: 'Ext.container.Container',
	alias: 'widget.Itinerary',
	layout: {
		type: 'hbox',
		align: 'left'
	},
	cls: 'itinerary',
    items: [{
        xtype: 'component',
        itemId: 'departure',
        tpl: '{date} <strong>{time}</strong>',
        cls: 'departure'
    },  {
        xtype: 'container',
        itemId: 'flights',
        layout: {
            type: 'hbox',
            align: 'left'
        }
    },  {
        xtype: 'component',
        itemId: 'arrival',
        tpl: '{date} <strong>{time}</strong>',
        cls: 'arrival'
    }]
});

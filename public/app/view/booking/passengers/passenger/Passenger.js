/**
 * @author Monica Olejniczak
 */
Ext.define('FB.view.booking.passengers.passenger.Passenger', {
	extend: 'Ext.container.Container',
	requires: [
		'Ext.Component',
		'FB.view.booking.passengers.passenger.option.TicketType',
		'FB.view.booking.passengers.passenger.option.LuggageType',
		'FB.view.booking.passengers.passenger.PassengerController'
	],
	xtype: 'Passenger',
	controller: 'Passenger',
	config: {
		passenger: null
	},
	layout: {
		type: 'hbox',
		align: 'stretch'
	},
	items: [{
		xtype: 'component',
		itemId: 'passenger',
		tpl: '<strong>Passenger {passenger}:</strong>',
		margin: '0 10px 10px 0'
	},  {
		xtype: 'TicketType',
		flex: 1,
		margin: '0 10px 10px 0'
	},  {
		xtype: 'LuggageType',
		flex: 1,
		margin: '0 0 10px 0'
	}]
});

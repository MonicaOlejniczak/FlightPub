/**
 * @author Monica Olejniczak
 */
Ext.define('FB.view.booking.seats.SeatSelection', {
	extend: 'Ext.container.Container',
	requires: [
		'Ext.Component',
		'FB.view.booking.seats.SeatSelectionController'
	],
	xtype: 'SeatSelection',
	controller: 'SeatSelection',
	config: {
		index: null,
		passengers: null,
		flight: null
	},
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	items: [{
		xtype: 'container',
		layout: 'hbox',
		margin: '0 0 10px 0',
		items: [{
			xtype: 'component',
			itemId: 'flight',
			tpl: 'Please select the seats you wish to book for your flight from {from} to {to}.',
			data: {
				from: '',
				to: ''
			},
			flex: 2,
			style: {
				'text-align': 'left'
			}
		},  {
			xtype: 'component',
			itemId: 'seatCount',
			tpl: '<strong>Seats left:</strong> {passengers}',
			data: {
				passengers: 0
			},
			flex: 1,
			style: {
				'text-align': 'right'
			}
		}]
	},  {
		xtype: 'container',
		itemId: 'seats'
	}]
});

/**
 * @author Monica Olejniczak
 */
Ext.define('FB.view.booking.seats.row.seat.Seat', {
	extend: 'Ext.button.Button',
	requires: [
		'FB.view.booking.seats.row.seat.SeatController'
	],
	xtype: 'Seat',
	controller: 'Seat',
	config: {
		selected: false,
        row: null,
        column: null
	},
    baseCls: 'x-btn-plain',
	flex: 1,
	margin: '0 0 0 5px'
});

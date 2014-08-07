/**
 * @author Monica Olejniczak
 */
Ext.define('FB.view.booking.seats.row.seat.SeatController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.Seat',
	init: function () {
		var seat = this.getView();
		// fire an event to the seat selection controller on a click event
		seat.on({
			click: {
				fn: function () {
					seat.fireEvent('select', seat);
				}, scope: this
			}
		});
	}
});

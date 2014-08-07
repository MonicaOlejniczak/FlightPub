/**
 * @author Monica Olejniczak
 */
Ext.define('FB.view.booking.seats.row.RowController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.SeatRow',
	requires: [
		'FB.view.booking.seats.row.seat.Seat'
	],
	init: function () {
		var view = this.getView();
		var row = view.getRow();
		var columns = view.getColumns();
		// update the row label
		view.down('#row').update({
			row: row
		});
		// loop through each column of the row
		for (var column = 0; column < columns; column++) {
			view.add(Ext.widget('Seat', {
				text: Ext.String.format('{0}{1}', row + 1, String.fromCharCode('A'.charCodeAt(0) + column)),
                row: row,
                column: column,
				cls: 'button-blue'
			}));
		}
	}
});

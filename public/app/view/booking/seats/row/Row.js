/**
 * @author Monica Olejniczak
 */
Ext.define('FB.view.booking.seats.row.Row', {
	extend: 'Ext.container.Container',
	requires: [
		'Ext.Component',
		'FB.view.booking.seats.row.RowController'
	],
	xtype: 'SeatRow',
	controller: 'SeatRow',
	config: {
		row: null,
		columns: null
	},
	layout: 'hbox',
	margin: '0 0 5px 0',
	items: [{
		xtype: 'component',
		itemId: 'row',
		tpl: 'Row {row}:',
		flex: 0.5
	}]
});

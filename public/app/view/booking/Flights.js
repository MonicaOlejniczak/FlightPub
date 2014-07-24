Ext.define('FB.view.booking.Flights', {
	extend: 'Ext.container.Container',
	requires: [
		'Ext.container.Container',
		'Ext.layout.container.Border',
		'Ext.form.field.Number',
		'Ext.form.field.ComboBox',
		'FB.view.booking.FlightsController'
	],
	xtype: 'Flights',
	controller: 'Flights'
});

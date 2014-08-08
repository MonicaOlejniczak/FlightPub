/**
 * @author Monica Olejniczak
 */
Ext.define('FB.view.booking.passengers.passenger.option.TicketType', {
	extend: 'Ext.form.field.ComboBox',
	requires: [
		'FB.store.TicketType'
	],
	xtype: 'TicketType',
	itemId: 'ticketType',
	store: 'TicketType',
	queryMode: 'local',
	displayField: 'name',
	valueField: 'name',
	value: 'Economy',
	editable: false,
	name: 'ticketType'
});

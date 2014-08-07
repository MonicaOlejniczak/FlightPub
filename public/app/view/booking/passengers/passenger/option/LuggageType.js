/**
 * @author Monica Olejniczak
 */
Ext.define('FB.view.booking.passengers.passenger.option.LuggageType', {
	extend: 'Ext.form.field.ComboBox',
	requires: [
		'FB.store.LuggageTypes'
	],
	xtype: 'LuggageType',
	itemId: 'luggageType',
	store: 'LuggageTypes',
	queryMode: 'local',
	displayField: 'name',
	valueField: 'value',
	value: 'CARRY_ON',
	editable: false,
	name: 'luggageType'
});

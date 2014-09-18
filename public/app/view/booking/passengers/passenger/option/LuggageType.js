/**
 * @author Monica Olejniczak
 */
Ext.define('FB.view.booking.passengers.passenger.option.LuggageType', {
	extend: 'Ext.form.field.ComboBox',
	requires: [
		'FB.store.LuggageType'
	],
	xtype: 'LuggageType',
	itemId: 'luggageType',
	store: 'LuggageType',
	queryMode: 'local',
	displayField: 'name',
	valueField: 'value',
	value: 'CARRY_ON',
	editable: false,
	name: 'luggageType',
    allowBlank: false
});

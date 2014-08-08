/**
 * @author Monica Olejniczak
 */
Ext.define('FB.store.LuggageType', {
	extend: 'Ext.data.Store',
	fields: [
		'name',
        'value'
	],
	data: [{
		name: 'Only Carry-On Luggage',
        value: 'CARRY_ON'
	},  {
		name: 'Carry-On Plus Checked Baggage',
        value: 'CHECKED'
	}]
});
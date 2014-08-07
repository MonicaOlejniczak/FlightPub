/**
 * @author Monica Olejniczak
 */
Ext.define('FB.store.TicketTypes', {
	extend: 'Ext.data.Store',
	fields: [
		'name'
	],
	data: [{
		name: 'Economy'
	},  {
		name: 'Premium Economy'
	},  {
		name: 'Business Class'
	},  {
		name: 'First Class'
	}]
});
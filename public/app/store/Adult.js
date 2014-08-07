/**
 * @author Monica Olejniczak
 */
Ext.define('FB.store.Adult', {
	extend: 'Ext.data.Store',
	fields: [
		'name',
        'value'
	],
	data: [{
		name: '1 Adult',
		value: 1
	},  {
		name: '2 Adults',
		value: 2
	},  {
		name: '3 Adults',
		value: 3
	},  {
		name: '4 Adults',
		value: 4
	},  {
		name: '5 Adults',
		value: 5
	}]
});
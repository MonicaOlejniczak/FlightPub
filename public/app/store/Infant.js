Ext.define('FB.store.Infant', {
	extend: 'Ext.data.Store',
	fields: [
		'name',
        'value'
	],
	data : [
		{'name': '0 Infants', 'value': 0},
		{'name': '1 Infant', 'value': 1},
		{'name': '2 Infants', 'value': 2},
		{'name': '3 Infants', 'value': 3},
		{'name': '4 Infants', 'value': 4},
		{'name': '5 Infants', 'value': 5}
	]
});
Ext.define('FB.stores.Airport', {
	extend: 'Ext.data.Store',
	model: 'FB.models.Airport',
	autoLoad: true,
	fields: [
		'name',
		'code',
		'longitude',
		'latitude'
	],
	proxy: {
		url: 'data/airports',
		type: 'ajax',
		reader: {
			type: 'json'
		}
	},
});
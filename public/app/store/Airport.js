Ext.define('FB.store.Airport', {
	extend: 'Ext.data.Store',
	model: 'FB.models.Airport',
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
	}
});
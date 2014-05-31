Ext.define('FB.stores.Airport', {
	model: 'FB.models.Airport',
	fields: [
		'name', 'code', 'longitude', 'latitude'
	],
	proxy: {
		url: 'data/airports',
		type: 'ajax',
		reader: {
			type: 'json'
		}
	},
	autoLoad: true
});
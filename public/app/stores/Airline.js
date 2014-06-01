Ext.define('FB.stores.Airline', {
	extend: 'Ext.data.Store',
	model: 'FB.models.Airline',
	autoLoad: true,
	fields: [
		'name',
		'code'
	],
	proxy: {
		url: 'data/airlines',
		type: 'ajax',
		reader: {
			type: 'json'
		}
	}
});
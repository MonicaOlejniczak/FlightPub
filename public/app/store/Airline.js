Ext.define('FB.store.Airline', {
	extend: 'Ext.data.Store',
	model: 'FB.models.Airline',
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
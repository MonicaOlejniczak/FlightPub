Ext.define('FB.stores.Airline', {
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
	},
	autoLoad: true
});
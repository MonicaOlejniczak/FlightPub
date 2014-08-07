/**
 * @author Brendan Annable
 */
Ext.define('FB.store.Airport', {
	extend: 'Ext.data.Store',
	model: 'FB.model.Airport',
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
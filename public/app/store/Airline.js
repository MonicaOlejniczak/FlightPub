/**
 * @author Brendan Annable
 */
Ext.define('FB.store.Airline', {
	extend: 'Ext.data.Store',
	model: 'FB.model.Airline',
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
/**
 * @author Brendan Annable
 */
Ext.define('FB.store.Airport', {
	extend: 'Ext.data.Store',
	model: 'FB.model.Airport',
    autoLoad: true,
	proxy: {
		url: 'data/airports',
		type: 'ajax',
		reader: {
			type: 'json'
		}
	}
});
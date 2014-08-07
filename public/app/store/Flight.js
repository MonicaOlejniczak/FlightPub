/**
 * @author Brendan Annable
 */
Ext.define('FB.store.Flight', {
	extend: 'Ext.data.Store',
	model: 'FB.model.Flight',
	proxy: {
		url: 'data/selectedFlights',
		type: 'ajax',
		reader: {
			type: 'json'
		}
	}
});

Ext.define('FB.store.Flight', {
	extend: 'Ext.data.Store',
	model: 'FB.models.Flight',
	proxy: {
		url: 'data/selectedFlights',
		type: 'ajax',
		reader: {
			type: 'json'
		}
	}
});

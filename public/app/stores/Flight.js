Ext.define('FB.stores.Flight', {
	extend: 'Ext.data.Store',
	model: 'FB.models.Flight',
	autoLoad: true,
	proxy: {
		url: 'data/selectedFlights',
		type: 'ajax',
		reader: {
			type: 'json'
		}
	}
});

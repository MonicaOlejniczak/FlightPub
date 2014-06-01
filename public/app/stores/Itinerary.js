Ext.define('FB.stores.Itinerary', {
	extend: 'Ext.data.Store',
	model: 'FB.models.Itinerary',
	autoLoad: true,
	proxy: {
		url: 'data/selectedFlights',
		type: 'ajax',
		reader: {
			type: 'json'
		}
	}
});

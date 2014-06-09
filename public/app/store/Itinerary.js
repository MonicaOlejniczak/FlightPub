Ext.define('FB.store.Itinerary', {
	extend: 'Ext.data.Store',
    requires: 'FB.models.Flight',
	model: 'FB.models.Itinerary',
	proxy: {
		url: 'data/selectedFlights',
		type: 'ajax',
		reader: {
			type: 'json'
		}
	}
});

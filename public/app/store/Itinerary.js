Ext.define('FB.store.Itinerary', {
	extend: 'Ext.data.Store',
    requires: 'FB.model.Flight',
	model: 'FB.model.Itinerary',
	proxy: {
		url: 'data/selectedFlights',
		type: 'ajax',
		reader: {
			type: 'json'
		}
	}
});

Ext.define('FB.models.Itinerary', {
	extend: 'Ext.data.Model',
	fields: [],
	associations: [{
		type: 'hasMany',
		model: 'Flight',
		name: 'flights'
	}]
});


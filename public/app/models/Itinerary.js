Ext.define('FB.models.Itinerary', {
	extend: 'Ext.data.Model',
	fields: ['flights']/*, didn't work, no time to fix
	hasMany: {
		model: 'Flight',
		name: 'flights',
        associationKey: 'flights'
	}*/
});


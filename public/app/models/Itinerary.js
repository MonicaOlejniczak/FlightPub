Ext.define('FB.models.Itinerary', {
	extend: 'Ext.data.Model',
	fields: [
        'id',
        'flights',
        'price',
        'duration',
        'stopOvers',
        'departureTime',
        'arrivalTime'
    ],/*, didn't work, no time to fix
	hasMany: {
		model: 'Flight',
		name: 'flights',
        associationKey: 'flights'
	}*/
    getFlightIds: function () {
        return this.get('flights').reduce(function (array, flight) {
            array.push(flight.id);
            return array
        }, []);
    }
});


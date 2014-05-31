Ext.define('FB.models.Flight', {
    extend: 'Ext.data.Model',
    fields: [
        'airline',
        'flightNumber',
	    'source',
        'departureTime',
	    'destination',
        'arrivalTime',
        'stopOver',
        'duration',
        'price'
    ]
});


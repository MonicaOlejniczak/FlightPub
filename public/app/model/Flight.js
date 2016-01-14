/**
 * @author Brendan Annable
 */
Ext.define('FB.model.Flight', {
    extend: 'Ext.data.Model',
    fields: [
        'airline',
        'flightNumber',
	    'source',
        'departureTime',
	    'destination',
        'arrivalTime',
        'duration',
        'price'
    ]
});


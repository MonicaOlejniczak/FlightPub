Ext.define('FB.models.Flight', {
    extend: 'Ext.data.Model',
    fields: [
        'airline',
        'flightNumber',
        'departureTime',
        'arrivalTime',
        'stopOver',
        'duration',
        'price'
    ]
});


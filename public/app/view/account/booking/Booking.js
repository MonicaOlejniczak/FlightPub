/**
 * @author Brendan Annable
 */
Ext.define('FB.view.account.booking.Booking', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.Booking',
    controller: 'Booking',
    requires: [
        'FB.view.account.booking.BookingController'
    ],
    config: {
        booking: null
    },
    style: {
        backgroundColor: '#fff'
    },
    // horrors
    tpl: '<div class="bookingItem">'
        +'<div>Status: {status}</div>'
        +'<div>Departing from {source} on {departureTime}</div>'
        +'<div>Arriving at {destination} on {arrivalTime}</div>'
        +'</div>'
});


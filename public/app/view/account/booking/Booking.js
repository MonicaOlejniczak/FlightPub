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
    cls: 'bookingItem',
    // horrors
    tpl: '<div class="bookingContent">'
            + '<div><strong>Status:</strong> {status}</div>'
            + '<div><strong>Departing:</strong>'
            + '<div class="departing">'
                + '<div><strong>Location: </strong> {source}</div>'
                + '<div><strong>Date: </strong> {departureDate}</div>'
                + '<div><strong>Time: </strong> {departureTime}</div>'
            + '</div>'
            + '<div><strong>Arriving:</strong>'
            + '<div class="arriving">'
                + '<div><strong>Location: </strong> {destination}</div>'
                + '<div><strong>Date: </strong> {arrivalDate}</div>'
                + '<div><strong>Time: </strong> {arrivalTime}</div>'
            + '</div>'
        + '</div>'
});


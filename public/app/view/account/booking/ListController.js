/**
 * @author Brendan Annable
 */
Ext.define('FB.view.account.booking.ListController', {
    extend: 'FB.view.PageController',
    alias: 'controller.BookingListController',
    requires: [
        'FB.view.account.booking.Booking'
    ],
    constructor: function () {
        this.setConfig({
            default: false,
            heading: 'Bookings'
        });
    },
    init: function () {
        var store = Ext.getStore('Booking');
        store.on('load', function (records, operation, success) {
            this.renderBookings(records);
        }, this);
        store.reload();
    },
    renderBookings: function (bookings) {
        var view = this.getView();
        var list = view.down('#list');
        bookings.each(function (booking) {
            list.add(Ext.widget('Booking', {
                booking: booking
            }));
        });
    }
});

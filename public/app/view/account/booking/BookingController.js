/**
 * @author Monica Olejniczak
 */
Ext.define('FB.view.account.booking.BookingController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Booking',
    init: function () {
        var view = this.getView();
        var booking = view.getBooking();
        view.update({
            id: booking.get('id')
        });
    }
});

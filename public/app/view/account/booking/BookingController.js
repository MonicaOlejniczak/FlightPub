/**
 * @author Monica Olejniczak
 */
Ext.define('FB.view.account.booking.BookingController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Booking',
    init: function () {
        var view = this.getView();
        var booking = view.getBooking();
        var status = booking.get('status');
        var itinerary = booking.get('itinerary');
        var source = itinerary.flights[0].source;
        var destination = itinerary.flights[itinerary.flights.length - 1].destination;
        var departureTime = new Date(itinerary.departureTime);
        var arrivalTime = new Date(itinerary.arrivalTime);
        var dateFormat = 'l \\t\\he jS \\of F, Y \\a\\t H:i:s A';
        view.update({
            source: source.name,
            destination: destination.name,
            status: status,
            arrivalTime: Ext.Date.format(arrivalTime, dateFormat),
            departureTime: Ext.Date.format(departureTime, dateFormat)
        });
        var title = source.name + " to " + destination.name;
        view.setTitle(title);
    }
});

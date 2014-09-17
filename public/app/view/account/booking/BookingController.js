/**
 * @author Monica Olejniczak
 */
Ext.define('FB.view.account.booking.BookingController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Booking',
    scrollPosition: null,
    init: function () {
        var view = this.getView();
        var booking = view.getBooking();
        var status = booking.get('status');
        var itinerary = booking.get('itinerary');
        var source = itinerary.flights[0].source;
        var destination = itinerary.flights[itinerary.flights.length - 1].destination;
        var departureTime = new Date(itinerary.departureTime);
        var arrivalTime = new Date(itinerary.arrivalTime);
        var dateFormat = 'l \\t\\he jS \\of F, Y';
        var timeFormat = 'H:i:s A';
        view.update({
            source: source.name,
            destination: destination.name,
            status: status,
            departureDate: Ext.Date.format(departureTime, dateFormat),
            departureTime: Ext.Date.format(departureTime, timeFormat),
            arrivalDate: Ext.Date.format(arrivalTime, dateFormat),
            arrivalTime: Ext.Date.format(arrivalTime, timeFormat)
        });
        var title = Ext.String.format("{0} to {1}", source.name ,destination.name);
        view.setTitle(title);
    }
});

/**
 * @author Monica Olejniczak
 */
Ext.define('FB.view.administration.edit.EditPanelController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.EditPanel',
    control: {
        '#back': {
            click: function () {
                var view = this.getView();
                view.fireEvent('back', view);
            }
        },
        '#edit': {
            click: function () {
                debugger;
                this.getView().fireEvent('redirect');
            }
        }
    },
    init: function () {
        var view = this.getView();
        var flight = view.getFlight();
        view.down('#airline').setValue(flight.airline.name);
        view.down('#flightNumber').setValue(flight.flightNumber);
        view.down('#source').setValue(flight.source.name);
        view.down('#destination').setValue(flight.destination.name);
        view.down('#departureTime').setValue(new Date(flight.departureTime));
        view.down('#arrivalTime').setValue(new Date(flight.arrivalTime));
        view.down('#price').setValue(flight.price);
    }

});

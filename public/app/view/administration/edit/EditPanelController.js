/**
 * @author Monica Olejniczak
 */
Ext.define('FB.view.administration.edit.EditPanelController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.EditPanel',
    control: {
        '#back': {
            click: 'onBack'
        },
        '#edit': {
            click: 'onEdit'
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
    },
    onBack: function () {
        var view = this.getView();
        view.fireEvent('back', view);
    },
    onEdit: function () {
        var view = this.getView();
        var flightId = view.getFlight().id;
        var flightDetails = {
            airline: view.down('#airline').getValue(),
            flightNumber: view.down('#flightNumber').getValue(),
            source: view.down('#source').getValue(),
            destination: view.down('#destination').getValue(),
            departureTime: view.down('#departureTime').getValue().getTime(),
            arrivalTime: view.down('#arrivalTime').getValue().getTime(),
            price: view.down('#price').getValue()
        };
        Ext.Ajax.request({
            url: '/admin/data/routes/edit',
            method: 'POST',
            jsonData: {
                flightId: flightId,
                flightDetails: flightDetails
            },
            success: function (response) {
                Ext.Msg.alert('Success', 'The flight was edited successfully.');
                view.fireEvent('back', view);
            },
            failure: function (response) {
                Ext.Msg.alert('Error', 'The flight could not be edited.');
            },
            scope: this
        });
    }

});

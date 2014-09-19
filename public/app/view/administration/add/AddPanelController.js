/**
 * @author Monica Olejniczak
 */
Ext.define('FB.view.administration.add.AddPanelController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.AddPanel',
    control: {
        '#back': {
            click: 'onBack'
        },
        '#add': {
            click: 'onAdd'
        }
    },
    init: function () {
        var view = this.getView();
        var departureTime = view.down('#departureTime');
        departureTime.setMinValue(new Date());
        departureTime.on('select', this.departing, this);
    },
    onBack: function () {
        var view = this.getView();
        view.fireEvent('back', view);
    },
    onAdd: function () {
        var view = this.getView();
        if (view.isValid()) {
            var flightDetails = {
                airline: view.down('#airline').getValue(),
                flightNumber: view.down('#flightNumber').getValue(),
                source: view.down('#source').getValue(),
                destination: view.down('#destination').getValue(),
                departureTime: view.down('#departureTime').getValue().getTime(),
                arrivalTime: view.down('#arrivalTime').getValue().getTime(),
                plane: view.down('#plane').getValue()
            };
            Ext.Ajax.request({
                url: '/admin/data/routes/add',
                method: 'POST',
                jsonData: {
                    flightDetails: flightDetails
                },
                success: function (response) {
                    Ext.Msg.alert('Success', 'The flight route was added successfully.');
                    view.fireEvent('back', view);
                },
                failure: function (response) {
                    Ext.Msg.alert('Error', 'The flight route could not be added.');
                },
                scope: this
            });
        } else {
            Ext.Msg.alert('Error', 'Form fields may not be submitted with invalid values.');
        }
    },
    /**
     * An event that is fired when the user chooses a departure date to ensure that the returning date is after that
     * day that they specified.
     *
     * @param departing the component that had the event fired
     * @param date the date that was selected by the user
     */
    departing: function (departing, date) {
        // get the returning date component
        // get the date for tomorrow
        // set the minimum value of the returning date component
        var returning = this.getView().down('#arrivalTime');
        var tomorrow = new Date(date.getTime() + (1000 * 60 * 60 * 24));
        returning.setMinValue(tomorrow);
        // check if the returning date needs to be updated
        if (returning.getValue() === null || returning.getValue().getTime() < date.getTime()) {
            // set the value to tomorrow
            returning.setValue(tomorrow);
        }

    }

});

/**
 * @author Monica Olejniczak
 */
Ext.define('FB.view.administration.AdministrationController', {
    extend: 'FB.view.PageController',
    alias: 'controller.Administration',
    init: function () {
        this.getView().down('#adminPanel').on({
            edit: this.onEdit,
            delete: this.onDelete
        })
    },
    constructor: function () {
        this.setConfig({
            heading: 'Administration Panel'
        });
    },
    onAddRoute: function () {
        // TODO: everything
    },
    /**
     * Creates the edit panel for a particular flight.
     *
     * @param flightId The id of the flight being deleted
     */
    onEdit: function (flightId) {
        var panels = this.getView().up('#panels');
        var editPanel = Ext.create('FB.view.administration.edit.EditPanel', {
            flight: this.store.getById(flightId).data
        });
        panels.add(editPanel);
        editPanel.on('back', function (panel) {
            panels.getLayout().prev();
            panels.remove(panel);
        });
        panels.getLayout().next();
    },
    /**
     * Removes the flight from the database when the user confirms deletion.
     *
     * @param flightId The id of the flight being deleted
     */
    onDelete: function (flightId) {
        Ext.create('Ext.window.MessageBox').show({
            title: 'Delete',
            msg: 'Do you wish to remove this flight?',
            buttonText: {
                yes: 'Remove Flight',
                no: 'Cancel'
            },
            fn: function (buttonId, text, opt) {
                if (buttonId == "yes") {
                    Ext.Ajax.request({
                        url: '/admin/data/routes/delete',
                        method: 'POST',
                        jsonData: {
                            flightId: flightId
                        },
                        success: function (response) {
                            console.log('The flight was removed successfully.');
                        },
                        failure: function (response) {
                            Ext.Msg.alert('Error', 'The flight could not be removed.');
                        },
                        scope: this
                    });
                }
            }, scope: this
        });
    }
});

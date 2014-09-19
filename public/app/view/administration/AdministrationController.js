/**
 * @author Monica Olejniczak
 */
Ext.define('FB.view.administration.AdministrationController', {
    extend: 'FB.view.PageController',
    alias: 'controller.Administration',
    panels: null,
    store: null,
    init: function () {
        var view = this.getView();
        view.down('#adminPanel').on({
            edit: 'onEdit',
            delete: 'onDelete'
        });
        view.down('#addRoute').on({
            click: 'onAddRoute',
            back: 'onBack'
        });
        this.panels = view.down('#panels');
    },
    constructor: function () {
        this.setConfig({
            heading: 'Administration Panel'
        });
    },
    /**
     * The event fired when the user chooses to add a new route.
     */
    onAddRoute: function () {
        var addPanel = Ext.create('FB.view.administration.add.AddPanel');
        addPanel.on({
            back: 'onBack'
        });
        this.addPanel(addPanel);
    },
    /**
     * Creates the edit panel for a particular flight.
     *
     * @param flightId The id of the flight being deleted
     */
    onEdit: function (flightId) {
        var store = this.getView().down('#adminPanel').getStore();
        var editPanel = Ext.create('FB.view.administration.edit.EditPanel', {
            flight: store.getById(flightId).data
        });
        editPanel.on({
            back: 'onBack'
        });
        this.addPanel(editPanel);
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
    },
    /**
     * The event that is fired when a back button is pressed inside the admin panel.
     *
     * @param panel The panel to remove.
     */
    onBack: function (panel) {
        this.panels.getLayout().prev();
        this.panels.remove(panel);
    },
    /**
     * Adds a panel to the layout and displays it.
     *
     * @param panel The panel to add
     */
    addPanel: function (panel) {
        this.panels.add(panel);
        this.panels.getLayout().next();
    }
});

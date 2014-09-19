/**
 * @author Monica Olejniczak
 */
Ext.define('FB.view.administration.Administration', {
    extend: 'Ext.container.Container',
    xtype: 'AdministrationPanel',
    requires: [
        'FB.view.administration.AdministrationController',
        'Ext.toolbar.Paging'
    ],
    controller: 'Administration',
    itemId: 'administration',
    items: [{
        xtype: 'container',
        cls: 'smallerContent',
        items: [{
            xtype: 'container',
            layout: 'card',
            itemId: 'panels',
            items: [{
                xtype: 'container',
                items: [{
                    xtype: 'grid',
                    title: 'Flights',
                    store: 'Route',
                    itemId: 'adminPanel',
                    columns: [
                        {text: 'Source', dataIndex: 'source', flex: 1, renderer: function (source) {
                            return source.name;
                        }},
                        {text: 'Destination', dataIndex: 'destination', flex: 1, renderer: function (destination) {
                            return destination.name;
                        }},
                        {text: 'Departure Date', dataIndex: 'departureTime', flex: 1, renderer: function (departureTime) {
                            var dateFormat = 'Y-m-d';
                            var date = new Date(departureTime);
                            return Ext.Date.format(date, dateFormat);
                        }},
                        {text: 'Departure Time', dataIndex: 'arrivalTime', flex: 1, renderer: function (departureTime) {
                            var dateFormat = 'H:i:s A';
                            var date = new Date(departureTime);
                            return Ext.Date.format(date, dateFormat);
                        }},
                        {text: 'Arrival Date', dataIndex: 'arrivalTime', flex: 1, renderer: function (arrivalTime) {
                            var dateFormat = 'Y-m-d';
                            var date = new Date(arrivalTime);
                            return Ext.Date.format(date, dateFormat);
                        }},
                        {text: 'Arrival Time', dataIndex: 'arrivalTime', flex: 1, renderer: function (arrivalTime) {
                            var dateFormat = 'H:i:s A';
                            var date = new Date(arrivalTime);
                            return Ext.Date.format(date, dateFormat);
                        }},
                        {text: 'Edit', dataIndex: 'id', renderer: function (id) {
                            var componentId = Ext.String.format('edit-route-{0}', id);
                            Ext.defer(function() {
                                Ext.widget('button', {
                                    renderTo: componentId,
                                    html: 'Edit',
                                    width: 'auto',
                                    cls: 'button-blue',
                                    listeners: {
                                        click: function () {
                                            this.fireEvent('edit', id);
                                        },
                                        scope: this
                                    }
                                });
                            }, 50, this);
                            return Ext.String.format('<div id="{0}"></div>', componentId);
                        }},
                        {text: 'Delete', dataIndex: 'id', renderer: function (id) {
                            var componentId = Ext.String.format('delete-route-{0}', id);
                            Ext.defer(function() {
                                Ext.widget('button', {
                                    renderTo: componentId,
                                    html: 'Delete',
                                    width: 'auto',
                                    cls: 'button-red',
                                    listeners: {
                                        click: function () {
                                            this.fireEvent('delete', id);
                                        },
                                        scope: this
                                    }
                                });
                            }, 50, this);
                            return Ext.String.format('<div id="{0}"></div>', componentId);
                        }}
                    ],
                    bbar: Ext.create('Ext.PagingToolbar', {
                        store: 'Route',
                        displayInfo: true,
                        displayMsg: 'Displaying topics {0} - {1} of {2}',
                        emptyMsg: "No topics to display"
                    })
                }, {
                    xtype: 'button',
                    text: 'Add Route',
                    cls: 'button-blue',
                    listeners: {
                        click: 'onAddRoute'
                    }
                }]
            }]
        }]
    }]
});

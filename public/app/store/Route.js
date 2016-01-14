Ext.define('FB.store.Route', {
    extend: 'Ext.data.Store',
    model: 'FB.model.Route',
    autoLoad: true,
    proxy: {
        url: 'admin/data/routes',
        type: 'ajax',
        reader: {
            type: 'json',
            rootProperty: 'routes'
        }
    }
});

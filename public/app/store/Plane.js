Ext.define('FB.store.Plane', {
    extend: 'Ext.data.Store',
    model: 'FB.model.Plane',
    autoLoad: true,
    proxy: {
        url: 'data/planes',
        type: 'ajax',
        reader: {
            type: 'json'
        }
    }
});

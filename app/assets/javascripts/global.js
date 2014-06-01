Ext.Loader.setConfig({
    enabled : true,
    paths : {
        'FB': './assets/app'
    }
});

Ext.namespace('FB');
// horrible things ahead
Ext.syncRequire('Ext.data.Store');

loadStores([
    'FB.stores.Airport'
]);

function loadStores (stores) {
    if (!Ext.isArray(stores)) {
        stores = [stores];
    }
    stores.forEach(function (store) {
        if (Ext.getStore(store) === undefined) {
            var storeObj = Ext.create(store);
            if (storeObj.storeId === undefined) {
                var cls = storeObj.$className;
                var namespaced = cls.indexOf('.') !== -1;
                storeObj.storeId = namespaced ? cls.substr(cls.lastIndexOf('.') + 1) : cls;
                Ext.StoreManager.register(storeObj);
            }
        }
    }, this);
}


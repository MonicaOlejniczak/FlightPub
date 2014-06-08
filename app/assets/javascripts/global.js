Ext.Loader.setConfig({
    enabled : true
});

Ext.application({
	name: 'FB',
	paths: {
		'FB': '/assets/app'
	},
	autoCreateViewport: false
});

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

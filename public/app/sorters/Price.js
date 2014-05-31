Ext.define('FB.sorters.Price', {
	extend: 'Ext.util.Sorter',
	root: 'data',
	property: 'price',
	direction: 'ASC',
	transform: function (price) {
		return price.price;
	}
});

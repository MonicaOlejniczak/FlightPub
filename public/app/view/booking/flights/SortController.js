Ext.define('FB.view.booking.flights.SortController', {
	extend: 'FB.view.ViewController',
	alias: 'controller.FlightsSort',
	requires: [
		'FB.sorter.ArrivalTime',
		'FB.sorter.DepartureTime',
		'FB.sorter.Duration',
		'FB.sorter.Price',
		'FB.sorter.StopOver'
	],
	config: {
		lastSortedBy: null,
		arrivalTimeSorter: Ext.create('FB.sorter.ArrivalTime'),
		departureTimeSorter: Ext.create('FB.sorter.DepartureTime'),
		durationSorter: Ext.create('FB.sorter.Duration'),
		priceSorter: Ext.create('FB.sorter.Price'),
		stopOverSorter: Ext.create('FB.sorter.StopOver')
	},
	control: {
		'Sort #sortPrice': {
			click: function () {
				this.sort(this.getPriceSorter());
			}
		}
	},
	init: function () {
		var view = this.getView();
		//this.sort.apply(this, ['sortPrice', this.priceSorter]);
		// add the sort listeners to the view
		//this.addEvents(view);
	},
	addEvents: function (view) {
		view.down('#price').on({
			'click': Ext.pass(this.sort, [this.priceSorter], this)
		});
		view.down('#duration').on({
			'click': Ext.pass(this.sort, [this.durationSorter], this)
		});
		view.down('#departureTime').on({
			'click': Ext.pass(this.sort, [this.departureTimeSorter], this)
		});
		view.down('#arrivalTime').on({
			'click': Ext.pass(this.sort, [this.arrivalTimeSorter], this)
		});
		view.down('#stopOvers').on({
			'click': Ext.pass(this.sort, [this.stopOverSorter], this)
		});
	},
	/**
	 * This method sorts the search results by first removing any selected classes and applying it to the correct
	 * flight. It then retrieves the parent element where the children (the sorted data) are stored and appends a
	 * specific flight div into the parent into the correct order.
	 *
	 * @param sorter the sorter being passed to the function
	 */
	sort: function (id, sorter) {
		Ext.select('.sortSelected').removeCls('sortSelected');
		Ext.get(id).addCls('sortSelected');
		if (id == this.lastSortedBy) {
			this.dataStore.sorters.each(function (sorter) {
				sorter.toggle();
			});
		}
		this.dataStore.sort(sorter);
		var parent = Ext.get('flights');
		this.dataStore.each(function (record) {
			parent.appendChild(Ext.get('flight_' + record.get('id')));
		});
		var count = 0;
		Ext.select(".itinerary").each(function (el) {
			if (++count >= 10) {
				el.addCls('hidden');
			} else {
				el.removeCls('hidden')
			}
		});
		this.setLastSortedBy(id);
	}

});

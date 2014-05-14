(function() {

	/*
	 @for(flight <- flights) {
	 @flight.flightNumber
	 <br />@flight.getPrice.price
	 <p></p>
	 }
	 */

	/**
	 * A constructor that adds the click events to the flights page
	 * @constructor
	 */
	function Flights () {
		var me = this;
		jQuery(function () {
			me.addEvents();
		});
		$(function () {
			//getFlights ();
		});
	}

	Flights.prototype.addEvents = function () {
		Ext.get('sortPrice').on({
			'click' : this.sortPrice,
			scope: this
		});
		Ext.get('sortDuration').on({
			'click' : this.sortDuration,
			scope: this
		});
		Ext.get('sortDepartureTime').on({
			'click' : this.sortDepartureTime,
			scope: this
		});
		Ext.get('sortArrivalTime').on({
			'click' : this.sortArrivalTime,
			scope: this
		});
		Ext.get('sortStopOvers').on({
			'click' : this.sortStopOvers,
			scope: this
		});
		Ext.get('sortAirline').on({
			'click' : this.sortAirline,
			scope: this
		});
		Ext.get('sortClass').on({
			'click' : this.sortClass,
			scope: this
		});
		Ext.get('filterNone').on({
			'click' : this.filterNone,
			scope: this
		});
		Ext.get('filterPrice').on({
			'click' : this.filterPrice,
			scope: this
		});
		Ext.get('filterDuration').on({
			'click' : this.filterDuration,
			scope: this
		});
		Ext.get('filterDepartureTime').on({
			'click' : this.filterDepartureTime,
			scope: this
		});
		Ext.get('filterArrivalTime').on({
			'click' : this.filterArrivalTime,
			scope: this
		});
		Ext.get('filterStopOvers').on({
			'click' : this.filterStopOvers,
			scope: this
		});
		Ext.get('filterAirline').on({
			'click' : this.filterAirline,
			scope: this
		});
		Ext.get('filterClass').on({
			'click' : this.filterClass,
			scope: this
		});
		Ext.get('filterAll').on({
			'click' : this.filterAll,
			scope: this
		});
	}

	/**
	 * Sorting the search results
	 */
	Flights.prototype.removeSortSelected = function () {
		Ext.select('.sortSelected').removeCls('sortSelected');
	}

	Flights.prototype.sortPrice = function () {
		this.removeSortSelected();
		Ext.get('sortPrice').addCls('sortSelected');
		flights.sort(sort_by('price'));
	}

	Flights.prototype.sortDuration = function () {
		this.removeSortSelected();
		Ext.get('sortDuration').addCls('sortSelected');
	}

	Flights.prototype.sortDepartureTime = function () {
		this.removeSortSelected();
		Ext.get('sortDepartureTime').addCls('sortSelected');
	}

	Flights.prototype.sortArrivalTime = function () {
		this.removeSortSelected();
		Ext.get('sortArrivalTime').addCls('sortSelected');
	}

	Flights.prototype.sortStopOvers = function () {
		this.removeSortSelected();
		Ext.get('sortStopOvers').addCls('sortSelected');
	}

	Flights.prototype.sortAirline = function () {
		this.removeSortSelected();
		Ext.get('sortAirline').addCls('sortSelected');
	}

	Flights.prototype.sortClass = function () {
		this.removeSortSelected();
		Ext.get('sortClass').addCls('sortSelected');
	}

	/**
	 * Filtering the search results
	 */

	Flights.prototype.filter = function (id) {
		Ext.get(id).toggleCls('filterSelected');
	}

	Flights.prototype.filterNone = function () {
		Ext.select('.filterSelected').removeCls('filterSelected');
	}

	Flights.prototype.filterPrice = function () {
		this.filter('filterPrice');
	}

	Flights.prototype.filterDuration = function () {
		this.filter('filterDuration');
	}

	Flights.prototype.filterDepartureTime = function () {
		this.filter('filterDepartureTime');
	}

	Flights.prototype.filterArrivalTime = function () {
		this.filter('filterArrivalTime');
	}

	Flights.prototype.filterStopOvers = function () {
		this.filter('filterStopOvers');
	}

	Flights.prototype.filterAirline = function () {
		this.filter('filterAirline');
	}

	Flights.prototype.filterClass = function () {
		this.filter('filterClass');
	}

	Flights.prototype.filterAll = function () {
		Ext.select('#filter > span').addCls('filterSelected');
	}

	window.FB.Flights = new Flights();

}());
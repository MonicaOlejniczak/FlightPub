(function() {

	/**
	 * A constructor that adds the click events to the flights page
	 * @constructor
	 */
	function Flights () {
		var me = this;
		jQuery(function () {
			me.addEvents();
		});
		$(function(){
			getFlights ();
		});


	}

	Flights.prototype.addEvents = function () {
		var me = this;
		jQuery("#sortPrice").click(function () {
			me.sortPrice();
		});
		jQuery("#sortDuration").click(function () {
			me.sortDuration();
		});
		jQuery("#sortDepartureTime").click(function () {
			me.sortDepartureTime();
		});
		jQuery("#sortArrivalTime").click(function () {
			me.sortArrivalTime();
		});
		jQuery("#sortStopOvers").click(function () {
			me.sortStopOvers();
		});
		jQuery("#sortAirline").click(function () {
			me.sortAirline();
		});
		jQuery("#sortClass").click(function () {
			me.sortClass();
		});
		jQuery("#filterNone").click(function () {
			me.filterNone();
		});
		jQuery("#filterPrice").click(function () {
			me.filterPrice();
		});
		jQuery("#filterDuration").click(function () {
			me.filterDuration();
		});
		jQuery("#filterDepartureTime").click(function () {
			me.filterDepartureTime();
		});
		jQuery("#filterArrivalTime").click(function () {
			me.filterArrivalTime();
		});
		jQuery("#filterStopOvers").click(function () {
			me.filterStopOvers();
		});
		jQuery("#filterAirline").click(function () {
			me.filterAirline();
		});
		jQuery("#filterClass").click(function () {
			me.filterClass();
		});
		jQuery("#filterAll").click(function () {
			me.filterAll();
		});
	}

	/**
	 * Sorting the search results
	 */
	Flights.prototype.removeSortSelected = function () {
		jQuery(".sortSelected").removeClass("sortSelected");
	}

	Flights.prototype.sortPrice = function () {
		this.removeSortSelected();
		jQuery("#sortPrice").addClass("sortSelected");
		flights.sort(sort_by("price"));
	}

	Flights.prototype.sortDuration = function () {
		this.removeSortSelected();
		jQuery("#sortDuration").addClass("sortSelected");
	}

	Flights.prototype.sortDepartureTime = function () {
		this.removeSortSelected();
		jQuery("#sortDepartureTime").addClass("sortSelected");
	}

	Flights.prototype.sortArrivalTime = function () {
		this.removeSortSelected();
		jQuery("#sortArrivalTime").addClass("sortSelected");
	}

	Flights.prototype.sortStopOvers = function () {
		this.removeSortSelected();
		jQuery("#sortStopOvers").addClass("sortSelected");
	}

	Flights.prototype.sortAirline = function () {
		this.removeSortSelected();
		jQuery("#sortAirline").addClass("sortSelected");
	}

	Flights.prototype.sortClass = function () {
		this.removeSortSelected();
		jQuery("#sortClass").addClass("sortSelected");
	}

	/**
	 * Filtering the search results
	 */

	Flights.prototype.filter = function (id) {
		var element = document.getElementById(id);
		element.className = element.className == "filterSelected" ? "" : "filterSelected";
	}

	Flights.prototype.filterNone = function () {
		jQuery(".filterSelected").removeClass("filterSelected");
	}

	Flights.prototype.filterPrice = function () {
		this.filter("filterPrice");
	}

	Flights.prototype.filterDuration = function () {
		this.filter("filterDuration");
	}

	Flights.prototype.filterDepartureTime = function () {
		this.filter("filterDepartureTime");
	}

	Flights.prototype.filterArrivalTime = function () {
		this.filter("filterArrivalTime");
	}

	Flights.prototype.filterStopOvers = function () {
		this.filter("filterStopOvers");
	}

	Flights.prototype.filterAirline = function () {
		this.filter("filterAirline");
	}

	Flights.prototype.filterClass = function () {
		this.filter("filterClass");
	}

	Flights.prototype.filterAll = function () {
		jQuery("#filter > span").addClass("filterSelected");
	}

	window.FB.Flights = new Flights();

}());
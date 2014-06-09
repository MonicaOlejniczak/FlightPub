Ext.define('FB.controller.Flights', {
	extend: 'Ext.app.Controller',
	/**
	 * Dependencies
	 */
	requires: [
		'FB.model.Flight',
		'FB.model.Airline',
		'FB.store.Itinerary',
		'FB.store.Airline',
		'FB.store.Airport',
		'FB.sorter.Price',
		'FB.sorter.Duration',
		'FB.sorter.DepartureTime',
		'FB.sorter.ArrivalTime',
		'FB.sorter.StopOver',
		'FB.sorter.Airline',
		'Ext.container.Container',
		'Ext.layout.container.Border',
		'Ext.form.field.Number',
		'Ext.form.field.ComboBox'
	],
	/**
	 * Initialising function
	 */
	init: function () {
		Ext.onReady(function () {
			this.lastSortedBy = null;
			this.activeContainer = null;
			this.priceSorter = Ext.create('FB.sorter.Price');
			this.durationSorter = Ext.create('FB.sorter.Duration');
			this.departureTimeSorter = Ext.create('FB.sorter.DepartureTime');
			this.arrivalTimeSorter = Ext.create('FB.sorter.ArrivalTime');
			this.stopOverSorter = Ext.create('FB.sorter.StopOver');
			this.airlineSorter = Ext.create('FB.sorter.Airline');
			this.priceContainer = null;
			this.durationContainer = null;
			this.stopOverContainer = null;
			this.airlineContainer = null;
            this.selectedItinerary = null;
			this.dataStore = Ext.create('FB.store.Itinerary', {
                autoLoad: false,
				listeners: {
					'load': function (store, records, successful, eOpts) {
						this.renderFlights();
						this.sort.apply(this, ['sortPrice', this.priceSorter]);
						this.createPriceContainer();
						this.createDurationContainer();
						this.createStopOverContainer();
						this.createAirlineContainer();
						this.createButtonContainer();
						this.addEvents();
					},
					scope: this
				}
			});
            var params = Ext.Object.fromQueryString(document.location.search);
            Ext.apply(this.dataStore.getProxy().extraParams, {
                source: params.source,
                destination: params.destination
            });
            this.dataStore.load();
		}, this);
	},
	getDataStore: function () {
		return this.dataStore;
	},
	/**
	 * Renders the flight results
	 */
	renderFlights: function () {
		var maxDuration = this.maxDuration();
        var count = 0;
        function pad(n, width, z) {
            z = z || '0';
            n = n + '';
            return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
        }
		this.dataStore.each(function (record) {
//            if (++count >= 10) {
//                return false;
//            }
            var itineraryId = record.get('id');
            var itinerary = record.get('flights');
            var i = 0;
            var flight = itinerary[i]; // TODO
            var contents = [];
            contents.push('<div id="flight_{itineraryId}" class="itinerary">'),
            itinerary.forEach(function (flight) {
                var date = new Date(flight.departureTime);
                var date2 = new Date(flight.arrivalTime);
                contents.push(
                    '<div id="flight_{itineraryId}_{flightId}" class="flight">',
                        '<div class="flightBar">',
                            '<div class="departure">',
                                '<div class="node"></div>',
                            '</div>',
                            '<div class="flightBarText">',
                                '<div class="flightBarTextVisible">',
                                    '${price}',
                                '</div>',
                                '<div class="flightBarTextHidden">',
                                    '<strong>' + pad(date.getHours(), 2) + ':' + pad(date.getMinutes(), 2) + ' - ' + flight.source.name + ' -> ' + flight.destination.name + ' - ' + pad(date2.getHours(), 2) + ':' + pad(date2.getMinutes(), 2) + '</strong>',
                                '</div>',
                            '</div>',
                            '<div class="arrival">',
                                '<div class="node"></div>',
                            '</div>',
                        '</div>',
                    '</div>'
                );
            });
            contents.push('</div>');
			Ext.get('flights').createChild(Ext.create('Ext.XTemplate', contents.join(''), {
                compiled: true
            }).apply({
                itineraryId: itineraryId,
				flightId: flight.id,
				airline: flight.airline.name,
				flightNumber: flight.flightNumber,
				price: flight.price.price,
				duration: flight.duration,
				source: flight.source.name,
				departureTime: new Date(flight.departureTime),
				destination: flight.destination.name,
				arrivalTime: new Date(flight.arrivalTime),
				stopOvers: itinerary.length - 1
			}));
			var itId = 'flight_' + itineraryId;
            var id = 'flight_' + itineraryId + "_" + flight.id;
			Ext.get(itId).setStyle({
				width: (flight.duration) + '%' /// maxDuration * 100) + '%'
			});
			var date = new Date(flight.departureTime);
			var departureTime = Ext.create('Ext.container.Container', {
				plain: true,
				renderTo: Ext.get(id).select('.departure .node').first(),
				html: date.getHours() + ':' + date.getMinutes(),
				cls: 'source',
				hidden: true
			});
			date = new Date(flight.arrivalTime);
			var arrivalTime = Ext.create('Ext.container.Container', {
				plain: true,
				renderTo: Ext.get(id).select('.arrival .node').first(),
                html: date.getHours() + ':' + date.getMinutes(),
				cls: 'destination',
				hidden: true
			});
			Ext.get(itId).on({
				'click': Ext.bind(this.selectFlight, this, [record], true),
				'mouseenter': function () {
					departureTime.show();
					arrivalTime.show();
				},
				'mouseleave': function () {
					departureTime.hide();
					arrivalTime.hide();
				}
			});
            var count = 0;
            Ext.select(".itinerary").each(function (el) {
                if (++count >= 10) {
                    el.addCls("hidden");
                }
            });
		}, this);
	},
	/**
	 * Selects a particular flight
	 */
	selectFlight: function (e, target, eOpts, record) {
		Ext.select('.selectFlight').removeCls('selectFlight');
		Ext.get(target).up('.itinerary').addCls('selectFlight');
        this.selectedItinerary = record;
	},
	/**
	 * Adds the container for the price filter
	 */
	createPriceContainer: function () {
		var maxValue = this.maxPrice();
		this.priceContainer = Ext.create('Ext.container.Container', {
			layout: 'hbox',
			renderTo: Ext.get('filterContainer'),
			cls: 'filterContainer',
			flex: 2,
			hidden: true,
			defaults: {
				xtype: 'numberfield',
				flex: 1,
				minValue: 0,
				maxValue: maxValue,
				maxLength: maxValue.toString().length,
				enforceMaxLength: true,
				hideTrigger: true
			},
			items: [{
				name: 'startPrice',
				id: 'startPrice',
				emptyText: 'minimum price',
				margin: '0 10px 0 0',
				listeners: {
					blur: function () {
						this.filterStartPrice();
					},
					scope: this
				}
			},  {
				name: 'endPrice',
				id: 'endPrice',
				emptyText: 'maximum price',
				margin: '0 10px 0 0',
				vtype: 'endPrice',
				listeners: {
					blur: function () {
						this.filterEndPrice();
					},
					scope: this
				}
			}, {
				xtype: 'button',
				name: 'clearPrice',
				id: 'clearPrice',
				text: 'Clear',
				scale: 'small',
				cls: 'clearButton',
				listeners: {
					click: function () {
						Ext.getCmp('startPrice').setValue(null);
						Ext.getCmp('endPrice').setValue(null);
						this.filterStartPrice();
						this.filterEndPrice();
					},
					scope: this
				}
			}]
		});
		Ext.apply(Ext.form.field.VTypes, {
			endPrice: function(value) {
				return Ext.getCmp('startPrice').getValue() < value;
			},
			endPriceText: 'Not a valid end price. This must be greater than the start price.'
		});
	},
	/**
	 * A method that calls the generic filter function to filter the start price
	 */
	filterStartPrice: function () {
		var id = 'startPrice';
		var startPrice = Ext.getCmp(id).getValue();
		this.filterFlights(id, function (value, item) {
			return startPrice == null ? true : startPrice <= item.data.price;
		}, 'filterPrice', startPrice == null && Ext.getCmp('endPrice').getValue() == null)
	},
	/**
	 * A method that calls the generic filter function to filter the end price
	 */
	filterEndPrice: function () {
		var id = 'endPrice';
		var endPrice = Ext.getCmp(id).getValue();
		this.filterFlights(id, function (value, item) {
			return endPrice == null ? true : endPrice >= item.data.price;
		}, 'filterPrice', Ext.getCmp('startPrice').getValue() == null && endPrice == null)
	},
	/**
	 * Adds the container for the duration filter
	 */
	createDurationContainer: function () {
		var maxValue = this.maxDuration();
		this.durationContainer = Ext.create('Ext.container.Container', {
			layout: 'hbox',
			renderTo: Ext.get('filterContainer'),
			cls: 'filterContainer',
			flex: 2,
			hidden: true,
			defaults: {
				xtype: 'numberfield',
				flex: 1,
				minValue: 0,
				maxValue: maxValue,
				maxLength: maxValue.toString().length,
				enforceMaxLength: true,
				hideTrigger: true
			},
			items: [{
				name: 'startDuration',
				id: 'startDuration',
				emptyText: 'minimum duration',
				margin: '0 10px 0 0',
				listeners: {
					blur: function () {
						this.filterStartDuration();
					},
					scope: this
				}
			},  {
				name: 'endDuration',
				id: 'endDuration',
				emptyText: 'maximum duration',
				margin: '0 10px 0 0',
				vtype: 'endDuration',
				listeners: {
					blur: function () {
						this.filterEndDuration();
					},
					scope: this
				}
			},  {
				xtype: 'button',
				name: 'clearDuration',
				id: 'clearDuration',
				text: 'Clear',
				scale: 'small',
				cls: 'clearButton',
				listeners: {
					click: function () {
						Ext.getCmp('startDuration').setValue(null);
						Ext.getCmp('endDuration').setValue(null);
						this.filterStartDuration();
						this.filterEndDuration();
					},
					scope: this
				}
			}]
		});
		Ext.apply(Ext.form.field.VTypes, {
			endDuration: function(value, field) {
				return Ext.getCmp('startDuration').getValue() < value;
			},
			endPriceText: 'Not a valid end duration. This must be greater than the start duration.'
		});
	},
	/**
	 * A method that calls the generic filter function to filter the start duration
	 */
	filterStartDuration: function () {
		var id = 'startDuration';
		var startDuration = Ext.getCmp(id).getValue();
		this.filterFlights(id, function (value, item) {
			return startDuration == null ? true : startDuration <= item.data.duration;
		}, 'filterDuration', startDuration == null && Ext.getCmp('endDuration').getValue() == null)
	},
	/**
	 * A method that calls the generic filter function to filter the end duration
	 */
	filterEndDuration: function () {
		var id = 'endDuration';
		var endDuration = Ext.getCmp(id).getValue();
		this.filterFlights(id, function (value, item) {
			return endDuration == null ? true : endDuration >= item.data.duration;
		}, 'filterDuration', Ext.getCmp('startDuration').getValue() == null && endDuration == null)
	},
	/**
	 * Adds the container for the airline filter
	 */
	createStopOverContainer: function () {
		//todo fix data store
		var stopOvers = Ext.create('Ext.data.Store', {
			fields: [
				'amount'
			],
			data : [
				{"amount": 0},
				{"amount": 1},
                {"amount": 2},
                {"amount": 3},
                {"amount": 4},
                {"amount": 5},
                {"amount": 6},
                {"amount": 7},
                {"amount": 8},
                {"amount": 9},
                {"amount": 10}
			]
		});
		this.stopOverContainer = Ext.create('Ext.container.Container', {
			layout: 'hbox',
			renderTo: Ext.get('filterContainer'),
			cls: 'filterContainer',
			flex: 2,
			hidden: true,
			items: [{
				xtype: 'combobox',
				name: 'stopOver',
				id: 'stopOver',
				store: stopOvers,
				displayField: 'amount',
				valueField: 'amount',
				editable: false,
				flex: 1,
				emptyText: 'none',
				margin: '0 10px 0 0',
				listeners: {
					select: function () {
						this.filterStopOvers();
					},
					scope: this
				}
			},  {
				xtype: 'button',
				flex: 0.5,
				name: 'clearStopOvers',
				id: 'clearStopOvers',
				text: 'Clear',
				scale: 'small',
				cls: 'clearButton',
				listeners: {
					click: function () {
						Ext.getCmp('stopOver').setValue(null);
						this.filterStopOvers();
					},
					scope: this
				}
			}]
		});
	},
	/**
	 * A method that calls the generic filter function to filter the stop overs
	 */
	filterStopOvers: function () {
		var id = 'stopOver';
		var stopOver = Ext.getCmp(id).getValue();
		this.filterFlights(id, function (value, item) {
			return stopOver == null ? true : stopOver > item.data.stopOvers;
		}, 'filterStopOvers', stopOver == null)
	},
	/**
	 * Adds the container for the airline filter
	 */
	createAirlineContainer: function () {
		//todo fix data store
		var airlines = Ext.create('Ext.data.Store', {
			fields: [
				'name',
				'code'
			],
			data : [
				{'name': 'Virgin Blue', 'code': 'Alabama'},
				{'name': 'Air Canada',  'code': 'Alaska'},
				{'name': 'Finnair',     'code': 'Arizona'}
			]
		});
		this.airlineContainer = Ext.create('Ext.container.Container', {
			layout: 'hbox',
			renderTo: Ext.get('filterContainer'),
			cls: 'filterContainer',
			flex: 2,
			hidden: true,
			items: [{
				xtype: 'combobox',
				name: 'airline',
				id: 'airline',
				store: airlines,
				model: 'FB.model.Airline',
				displayField: 'name',
				valueField: 'name',
				editable: false,
				flex: 1,
				emptyText: 'no airline selected',
				margin: '0 10px 0 0',
				listeners: {
					select: function () {
						this.filterAirline();
					},
					scope: this
				}
			},  {
				xtype: 'button',
				flex: 0.5,
				name: 'clearAirlines',
				id: 'clearAirlines',
				text: 'Clear',
				scale: 'small',
				cls: 'clearButton',
				listeners: {
					click: function () {
						Ext.getCmp('airline').setValue(null);
						this.filterAirline();
					},
					scope: this
				}
			}]
		});
	},
	/**
	 * A method that calls the generic filter function to filter the stop overs
	 */
	filterAirline: function () {
		var id = 'airline';
		var airline = Ext.getCmp(id).getValue();
		this.filterFlights(id, function (value, item) {
			return airline == null ? true : airline.toLowerCase() == item.data.airline.name.toLowerCase();
		}, 'filterAirline', airline == null)
	},
	/**
	 * Adds the button container
	 */
	createButtonContainer: function () {
		Ext.create('Ext.container.Container', {
			layout: 'hbox',
			renderTo: Ext.get('buttons'),
			defaults: {
				xtype: 'button',
				scale: 'large',
				cls: 'button'
			},
			items: [
				{
				name: 'cancel',
				id: 'cancel',
				cls: 'cancelButton',
				text: 'Cancel',
				margin: '0 10px 0 0',
				listeners: {
					click: function () {
						Ext.create('Ext.window.MessageBox').show ({
							title: 'Cancel Booking',
							msg: 'Do you wish to cancel your booking?',
							buttonText: {
								yes: 'Cancel Booking',
								no: 'Resume Booking'
							},
							fn: function (buttonId, text, opt) {
								if (buttonId == "yes") {
									window.location.href = '/';
								}
							}
						});
					}
				}
			},  {
				name: 'back',
				id: 'back',
				text: 'Back',
				margin: '0 10px 0 0',
				listeners: {
					click: function () {
						window.location.href = '/';
					}
				}
			},  {
				name: 'next',
				id: 'next',
				text: 'Next',
				listeners: {
					click: function () {
						// TODO: add returning functionality
                        var itinerary = this.selectedItinerary;
						if (itinerary === null) {
							Ext.create('Ext.window.MessageBox').alert('Error', 'You have not selected a flight.');
						} else {
                            var form = Ext.create('Ext.form.Panel', {
                                url: '/luggage',
                                standardSubmit: true,
                                method: 'post'
                            });
                            form.submit({
                                params: {
                                    itinerary: itinerary.getFlightIds()
                                }
                            });
						}
					},
                    scope: this
				}
			}]
		});
	},
	/**
	 * A method to calculate the maximum price based on the flights
	 */
	maxPrice: function() {
		var max = 0;
		this.dataStore.each(function (record) {
			max = Math.max(max, record.get('price').price);
		});
		return Math.ceil(max);
	},
	/**
	 * A methods to calculate the maximum duration based on the flights
	 */
	maxDuration: function() {
		var max = 0;
		this.dataStore.each(function (record) {
			max = Math.max(max, record.get('duration'));
		});
		return Math.ceil(max);
	},
	/**
	 * This method toggles the container's visibility and hides any active containers and text
	 *
	 * @param container the container to toggle whether it is shown or hidden
	 * @param text the filter text associated with the container
	 */
	toggleContainer: function (container, text) {
		Ext.select('.filterSelected').removeCls('filterSelected');
		if (container.isHidden()) {
			container.show();
			if (this.activeContainer != null) {
				this.activeContainer.hide();
			}
			text.addCls('filterSelected');
			this.activeContainer = container;
		} else {
			container.hide();
			this.activeContainer = null;
		}
	},
	/**
	 * Adds click events to each sorting and filtering option
	 */
	addEvents: function () {
		Ext.get('sortPrice').on({
			'click': Ext.pass(this.sort, ['sortPrice', this.priceSorter], this)
		});
		Ext.get('sortDuration').on({
			'click': Ext.pass(this.sort, ['sortDuration', this.durationSorter], this)
		});
		Ext.get('sortDepartureTime').on({
			'click': Ext.pass(this.sort, ['sortDepartureTime', this.departureTimeSorter], this)
		});
		Ext.get('sortArrivalTime').on({
			'click': Ext.pass(this.sort, ['sortArrivalTime', this.arrivalTimeSorter], this)
		});
		Ext.get('sortStopOvers').on({
			'click': Ext.pass(this.sort, ['sortStopOvers', this.stopOverSorter], this)
		});
		Ext.get('sortAirline').on({
			'click': Ext.pass(this.sort, ['sortAirline', this.airlineSorter], this)
		});
		Ext.get('filterNone').on({
			'click': this.filterNone,
			scope: this
		});
		Ext.get('filterPrice').on({
			'click': Ext.pass(this.toggleContainer, [this.priceContainer, Ext.get('filterPrice')], this)
		});
		Ext.get('filterDuration').on({
			'click': Ext.pass(this.toggleContainer, [this.durationContainer, Ext.get('filterDuration')], this)
		});
		Ext.get('filterStopOvers').on({
			'click': Ext.pass(this.toggleContainer, [this.stopOverContainer, Ext.get('filterStopOvers')], this)
		});
		Ext.get('filterAirline').on({
			'click': Ext.pass(this.toggleContainer, [this.airlineContainer, Ext.get('filterAirline')], this)
		});
	},
	/**
	 * This method sorts the search results by first removing any selected classes and applying it to the correct
	 * flight. It then retrieves the parent element where the children (the sorted data) are stored and appends a
	 * specific flight div into the parent into the correct order.
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
		this.lastSortedBy = id;
	},
	/**
	 * Filter the search results by hiding the filtered DOM elements
	 */
	filter: function() {
		Ext.select('#flights > div').addCls('filter');
		this.dataStore.each(function (record) {
			Ext.get('flight_' + record.get('id')).removeCls('filter');
		});
	},
	/**
	 * Clears the values in each input, hides any active containers and removes all filters
	 */
	filterNone: function () {
		var inputs = Ext.select('input');
		inputs.each(function (input) {
			input.dom.value = null;
		});
		if (this.activeContainer != null) {
			this.activeContainer.hide();
			this.activeContainer = null;
		}
		Ext.select('.filterActive').removeCls('filterActive');
		Ext.select('.filterSelected').removeCls('filterSelected');
		this.dataStore.clearFilter();
		this.filter();
	},
	/**
	 * Filters the specified component
	 *
	 * @param id the id of the component to filter
	 * @param compare the comparator function
	 * @param filterId the id of the html class to underline as active
	 * @param inactive whether the text for the filter id is active
	 */
	filterFlights: function (id, compare, filterId, inactive) {
		var component = Ext.getCmp(id);
		var filterName = id + 'Filter';
		if (component.isValid()) {
			this.dataStore.filters.removeAtKey(filterName);
			this.dataStore.addFilter([
				Ext.create('Ext.util.Filter', {
					id: filterName,
					filterFn: function(item) {
						if (inactive) {
							Ext.get(filterId).removeCls('filterActive');
						} else {
							Ext.get(filterId).addCls('filterActive');
						}
						return compare(component.getValue(), item);
					}
				})
			]);
			this.filter();
		}
	}

});

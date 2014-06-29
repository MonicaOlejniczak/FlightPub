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
			this.priceContainer = null;
			this.durationContainer = null;
			this.stopOverContainer = null;
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
						this.createButtonContainer();
						this.addEvents();
					},
					scope: this
				}
			});
            var params = Ext.Object.fromQueryString(document.location.search);
            Ext.apply(this.dataStore.getProxy().extraParams, {
                source: params.source,
                destination: params.destination,
                departing: params.departing,
                returning: params.returning
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
        var count = 0;
        function pad(n, width, z) {
            z = z || '0';
            n = n + '';
            return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
        }
		this.dataStore.each(function (record) {
            var itineraryId = record.get('id');
            var itinerary = record.get('flights');
            var contents = [];
			var hourWidth = 100;
            contents.push('<div id="flight_{itineraryId}" class="itinerary">'),
            itinerary.forEach(function (flight, i) {
	            var flightId = flight.id;
		        var flightNumber = flight.flightNumber;
		        var price = flight.price.price;
		        var duration = flight.duration;
		        var source = flight.source.name;
                var departureTime = new Date(flight.departureTime);
                var arrivalTime = new Date(flight.arrivalTime);
	            var airline = flight.airline.name;
	            var destinationCode = flight.destination.code;
	            var flightWidth = (duration / 60) * hourWidth;
                contents.push(
                    '<div id="flight_{itineraryId}_' + flightId + '" class="flight" style="width:' + flightWidth.toFixed(2) + 'px">',
                        '<div class="flightBar">',
                            '<div class="departure">',
                                '<div class="node"></div>',
                            '</div>',
                            '<div class="flightBarText">',
                                '<div class="flightBarTextVisible">',
                                    i === 0 ? '$' + record.get('price').toFixed(2) : '',
                                '</div>',
                                '<div class="flightBarTextHidden">',
                                    '<strong>' + airline + '</strong>',
                                '</div>',
                            '</div>',
                            '<div class="arrival">',
                                '<div class="node"></div>',
                            '</div>',
                        '</div>',
                    '</div>'
                );
	            if (i < itinerary.length - 1) {
		            var hours = 1000 * 60 * 60;
		            var nextFlightArrival = new Date(itinerary[i + 1].departureTime);
		            var startTime = arrivalTime.getTime() / hours;
		            var endTime = nextFlightArrival.getTime() / hours;
		            var width = (endTime - startTime) * hourWidth;
		            contents.push(
			            '<div class="waitBar" style="width:' + width.toFixed(2) + 'px">' + destinationCode + '</div>'
		            );
	            }
            });
			/*' + pad(departureTime.getHours(), 2) + ':' + pad(departureTime.getMinutes(), 2) + ' - ' + pad(arrivalTime.getHours(), 2) + ':' + pad(arrivalTime.getMinutes(), 2) + '*/
            contents.push('</div>');
			Ext.get('flights').createChild(Ext.create('Ext.XTemplate', contents.join(''), {
                compiled: true
            }).apply({
                itineraryId: itineraryId,
				stopOvers: itinerary.length - 1
			}));
			debugger;
			var weekday = new Array(7);
			weekday[0]=  "Sun";
			weekday[1] = "Mon";
			weekday[2] = "Tue";
			weekday[3] = "Wed";
			weekday[4] = "Thu";
			weekday[5] = "Fri";
			weekday[6] = "Sat";
			var itId = 'flight_' + itineraryId;
            //var id = 'flight_' + itineraryId + "_" + flight.id;
			var date = new Date(itinerary[0].departureTime);
			var departureTime = Ext.create('Ext.container.Container', {
				plain: true,
				renderTo: Ext.get('flight_' + itineraryId + '_' + itinerary[0].id),
				html: weekday[date.getDay()] + ' ' + + pad(date.getHours(), 2) + ':' + pad(date.getMinutes(), 2),
				cls: 'source',
				hidden: true
			});
			date = new Date(itinerary[itinerary.length - 1].arrivalTime);
			var arrivalTime = Ext.create('Ext.container.Container', {
				plain: true,
				renderTo: Ext.get('flight_' + itineraryId + '_' + itinerary[itinerary.length - 1].id),
                html: weekday[date.getDay()] + ' ' + pad(date.getHours(), 2) + ':' + pad(date.getMinutes(), 2),
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
            Ext.select('.itinerary').each(function (el) {
                if (++count >= 10) {
                    el.addCls('hidden');
                }
            });
		}, this);
        if (this.dataStore.getTotalCount() === 0) {
            Ext.get('flights').createChild(Ext.create('Ext.XTemplate',
                '<div style="font-size: 2em; text-align: center; padding: 30px">No Flights Found</div>').apply({
            }));
        }
	},
	/**
	 * Selects a particular flight
	 */
	selectFlight: function (e, target, eOpts, record) {
		var element = Ext.get(target);
		if (!element.hasCls('itinerary')) {
			Ext.select('.selectFlight').removeCls('selectFlight');
			element.up('.itinerary').addCls('selectFlight');
			this.selectedItinerary = record; // select
		}
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
				{'amount': 0},
				{'amount': 1},
                {'amount': 2},
                {'amount': 3},
                {'amount': 4},
                {'amount': 5},
                {'amount': 6},
                {'amount': 7},
                {'amount': 8},
                {'amount': 9},
                {'amount': 10}
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
			return stopOver === item.data.stopOvers;
		}, 'filterStopOvers', stopOver == null)
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
						debugger;
						// TODO: add returning functionality
                        var itinerary = this.selectedItinerary;
                        var qParams = Ext.Object.fromQueryString(document.location.search);
                        var numTickets = parseInt(qParams.adults, 10) + parseInt(qParams.children, 10) + parseInt(qParams.infants, 10);
						if (itinerary === null) {
							Ext.create('Ext.window.MessageBox').alert('Error', 'You have not selected a flight.');
						} else {
                            var form = Ext.create('Ext.form.Panel', {
                                url: '/tickets',
                                standardSubmit: true,
                                method: 'post'
                            });
                            form.submit({
                                params: {
                                    params: Ext.encode({
                                        itinerary: itinerary.getFlightIds(),
                                        numTickets: numTickets
                                    })
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

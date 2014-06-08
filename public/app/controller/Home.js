Ext.define('FB.controller.Home', {
	extend: 'Ext.app.Controller',
	/**
	 * Dependencies
	 */
	requires: [
		'FB.models.Airport',
		'FB.stores.Airport',
		'Ext.container.Container',
		'Ext.form.Panel',
		'Ext.form.Label',
		'Ext.form.field.ComboBox',
		'Ext.form.field.Date'
	],
	/**
	 * Default constructor
	 */
	constructor: function () {
        Ext.onReady(function () {
	        this.map = null;
	        this.polyline = null;
	        this.source = null;
	        this.target = null;
            this.renderForm();
        }, this);
    },
	/**
	 * Renders the main form
	 */
    renderForm: function () {
		var formId = 'homeForm';
		var form = Ext.create('Ext.form.Panel', {
			id: formId,
			renderTo: 'home',
			url: '/flights',
			method: 'get',
			standardSubmit: true,
			height: '100%',
			items: [],
			buttons: []
		}, this);
		var topInputContainer = Ext.create('Ext.container.Container', {
			layout: {
				type: 'hbox'
			},
			renderTo: Ext.get(formId),
			cls: 'inputs'
		});
		var fromContainer = Ext.create('Ext.container.Container', {
			layout: {
				type: 'vbox',
				align: 'stretch'
			},
			flex: 1
		});
		var toContainer = Ext.create('Ext.container.Container', {
			layout: {
				type: 'vbox',
				align: 'stretch'
			},
			flex: 1
		});
		var bottomInputContainer = Ext.create('Ext.container.Container', {
			layout: {
				type: 'hbox'
			},
			renderTo: Ext.get(formId),
			cls: 'inputs'
		});
		var buttonInputContainer = Ext.create('Ext.container.Container', {
			layout: {
				type: 'hbox'
			},
			renderTo: Ext.get(formId),
			cls: 'inputs'
		});
		topInputContainer.add(fromContainer);
		topInputContainer.add(toContainer);
		this.renderFlightFrom(fromContainer);
		this.renderDeparting(fromContainer);
		this.renderFlightTo(toContainer);
		this.renderReturning(toContainer);
		this.renderPassengers(bottomInputContainer);
		this.renderFlightButton(buttonInputContainer, form);
		this.renderMap(formId);
    },
	/**
	 * Renders the flight from combobox and label
	 *
	 * @param container the container within the main form
	 */
	renderFlightFrom: function (container) {
		container.add(Ext.create('Ext.form.ComboBox', {
            id: 'flightFrom',
			store: 'Airport',
			model: 'FB.models.Airport',
			queryMode: 'remote',
			displayField: 'name',
			valueField: 'name',
			fieldLabel: 'Flight from',
			flex: 1,
			emptyText: 'none',
			listeners: {
				select: function (combo, newValue) {
					this.source = newValue[0];
					if (this.target != null) {
						this.updateMap(this.source, this.target);
					}
				},
				scope: this
			}
		}));
	},
	/**
	 * Renders the flight to combobox and label
	 *
	 * @param container the container within the main form
	 */
	renderFlightTo: function (container) {
		container.add(Ext.create('Ext.form.ComboBox', {
			id: 'flightTo',
			store: 'Airport',
			model: 'FB.models.Airport',
			queryMode: 'remote',
			displayField: 'name',
			valueField: 'name',
			fieldLabel: 'Flight to',
			flex: 1,
			emptyText: 'none',
			listeners: {
				select: function (combo, newValue) {
					this.target = newValue[0];
					this.updateMap(this.source, this.target);
				},
				scope: this
			}
		}));
	},
	/**
	 * Renders the departing date picker
	 *
	 * @param container the container within the main form
	 */
	renderDeparting: function (container) {
		container.add(Ext.create('Ext.form.field.Date', {
			id: 'departing',
			flex: 1,
			fieldLabel: 'Departing',
			minDate: new Date()
		}));
	},
	/**
	 * Renders the returning date picker
	 *
	 * @param container the container within the main form
	 */
	renderReturning: function (container) {
		container.add(Ext.create('Ext.form.field.Date', {
			id: 'returning',
			flex: 1,
			fieldLabel: 'Returning',
			minDate: new Date()
		}));
	},
	/**
	 * Renders the google map to the form
	 */
	renderMap: function (formId) {
		var id = 'map';
		var container = Ext.create('Ext.container.Container', {
			id: id,
			layout: {
				type: 'hbox',
				align: 'stretch'
			},
			renderTo: Ext.get(formId)
		});
		var map_canvas = Ext.get(id).dom;
		var map_options = {
			center: new google.maps.LatLng(30, -85),
			zoom: 2,
			panControl: false,
			zoomControl: false,
			mapTypeControl: false,
			streetViewControl: false,
			overviewMapControl: false,
			scrollwheel: false,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		// todo fix bounds for zooming, kk brendan
		var bounds = new google.maps.LatLngBounds(
			new google.maps.LatLng(-50, -127.50),
			new google.maps.LatLng(65, 55.90)
		);
		var map = this.map = new google.maps.Map(map_canvas, map_options);
		map.set('styles', [{
			elementType: 'labels',
			stylers: [{
				visibility: 'off'
			}]
		},  {
			featureType: 'water',
			stylers: [{
				color: '#ffffff'
			}]
		},  {
			featureType: 'landscape',
			stylers: [{
				color: '#333333'
			}]
		},  {
			featureType: 'road',
			elementType: 'geometry',
			stylers: [{
				color: '#000000',
				weight: 1.6,
				visibility: 'simplified'
			}]
		},  {
			featureType: 'administrative',
			elementType: 'geometry',
			stylers: [{
				visibility: 'off'
			}]
		},  {
			featureType: 'poi',
			elementType: 'all',
			stylers: [{
				visibility: 'off'
			}]
		}]);
	},
	/**
	 * Renders the passenger inputs
	 *
	 * @param container the container within the main form
	 */
	renderPassengers: function (container) {
		this.renderAdults(container);
		this.renderChildren(container);
		this.renderInfants(container);
	},
	/**
	 * Renders the adults in the form
	 *
	 * @param container the container within the main form
	 */
	renderAdults: function (container) {
		var store = Ext.create('Ext.data.Store', {
			fields: ['name'],
			data : [
				{'name': '1 Adult'},
				{'name': '2 Adults'},
				{'name': '3 Adults'},
				{'name': '4 Adults'},
				{'name': '5 Adults'}
			]
		});
		container.add(Ext.create('Ext.form.ComboBox', {
			store: store,
			queryMode: 'local',
			displayField: 'name',
			valueField: 'name',
			fieldLabel: 'Passengers',
			flex: 1,
			value: '1 Adult',
			margin: '0 10px 0 0'
		}));
	},
	/**
	 * Renders the children in the form
	 *
	 * @param container the container within the main form
	 */
	renderChildren: function (container) {
		var store = Ext.create('Ext.data.Store', {
			fields: ['name'],
			data : [
				{'name': '0 Children'},
				{'name': '1 Child'},
				{'name': '2 Children'},
				{'name': '3 Children'},
				{'name': '4 Children'},
				{'name': '5 Children'}
			]
		});
		container.add(Ext.create('Ext.form.ComboBox', {
			store: store,
			queryMode: 'local',
			displayField: 'name',
			valueField: 'name',
			flex: 1,
			value: '0 Children',
			margin: '0 10px 0 0'
		}));
	},
	/**
	 * Renders the infants in the form
	 *
	 * @param container the container within the main form
	 */
	renderInfants: function (container) {
		var store = Ext.create('Ext.data.Store', {
			fields: ['name'],
			data : [
				{'name': '0 Infants'},
				{'name': '1 Infant'},
				{'name': '2 Infants'},
				{'name': '3 Infants'},
				{'name': '4 Infants'},
				{'name': '5 Infants'}
			]
		});
		container.add(Ext.create('Ext.form.ComboBox', {
			store: store,
			queryMode: 'local',
			displayField: 'name',
			valueField: 'name',
			flex: 1,
			value: '0 Infants'
		}));
	},
	/**
	 * Renders the flight button for the form
	 *
	 *  @param container the button container
	 *  @param form the main form used on the page
	 */
	renderFlightButton: function (container, form) {
		var buttonContainer = Ext.create('Ext.container.Container', {
			cls: 'buttons',
			layout: {
				type: 'hbox'
			}
		});
		buttonContainer.add(Ext.create('Ext.button.Button', {
			renderTo: container.getId(),
			text: 'Find Flights',
			cls: 'buttons',
			scale: 'large',
			formBind: true,
			handler: function () {
				form.getForm().submit({
                    params: {
                        source: Ext.getCmp('flightFrom').getValue(),
                        destination: Ext.getCmp('flightTo').getValue()
                    },
					success: function (form, action) {
						Ext.Msg.alert('Success', action.result.msg);
					},
					failure: function (form, action) {
						switch (action.failureType) {
							case Ext.form.action.Action.CLIENT_INVALID:
								Ext.Msg.alert('Failure', 'Form fields may not be submitted with invalid values');
								break;
							case Ext.form.action.Action.CONNECT_FAILURE:
								Ext.Msg.alert('Failure', 'Ajax communication failed');
								break;
							case Ext.form.action.Action.SERVER_INVALID:
								Ext.Msg.alert('Failure', action.result.msg);
						}
					}
				});
			}, scope: this
		}));
	},
	/**
	 * Updates the map to display the distance
	 *
	 * @param source the source airport
	 * @param target the target airport
	 */
    updateMap: function (source, target) {
        var coords = [
            new google.maps.LatLng(this.parseLatLng(source.get('latitude')), this.parseLatLng(source.get('longitude'))),
            new google.maps.LatLng(this.parseLatLng(target.get('latitude')), this.parseLatLng(target.get('longitude')))
        ];
        if (this.polyline !== null) {
            this.polyline.setMap(null);
        }
        this.polyline = new google.maps.Polyline({
            path: coords,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 2,
            map: this.map
        });
        var bounds = new google.maps.LatLngBounds();
        for (var i = 0; i < coords.length; i++) {
            bounds.extend(coords[i]);
        }
        this.map.fitBounds(bounds);
    },
	/**
	 * Parses the co-ordinates
	 *
	 * @param input the input array
	 * @returns {*}
	 */
    parseLatLng: function (input) {
        var lat = input.split(':');
        var deg = lat[0];
        var min = lat[1];
        var sec = lat[2];
        var sgn = lat[3];
        return sgn === 'N' || sgn === 'E' ? deg : -deg;
    }

});

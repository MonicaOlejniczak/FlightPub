/**
 * @author Brendan Annable
 * @author Monica Olejniczak
 */
Ext.define('FB.view.home.HomeController', {
	extend: 'FB.view.PageController',
	alias: 'controller.Home',
	config: {
		googleMap: null,
		polyline: null,
		source: null,
		target: null
	},
	constructor: function () {
		this.setConfig({
			default: true,
			heading: 'Home'
		});
	},
	init: function () {
		var form = this.getView();
        // set the dates for the departure and returning
        var currentDate = new Date();
        form.down('#departing').setMinValue(currentDate);
        form.down('#returning').setMinValue(currentDate);
		// add the event listeners to the form
		this.addEvents(form);
    },
	/**
	 * This method adds event handlers to the form
	 *
	 * @param form the form to add the events to
	 */
	addEvents: function (form) {
		// the function called when a departure from the 'flight from' combobox is selected
		function flightFrom (combo, records) {
			this.setSource(records[0]);
			if (this.getTarget() != null) {
				this.updateMap(this.getSource(), this.getTarget());
			}
		}
		// the function called when an arrival from the 'flight to' combobox is selected
		function flightTo(combo, records) {
			this.setTarget(records[0]);
			this.updateMap(this.getSource(), this.getTarget());
		}
		// add the listeners
		form.on('afterrender', this.render, this);
		form.down('#flightFrom').on('select', flightFrom, this);
		form.down('#flightTo').on('select', flightTo, this);
        form.down('#departing').on('select', this.departing, this);
		form.down('#submit').on('click', this.submit, this);
	},
    /**
     * An event that is fired when the user chooses a departure date to ensure that the returning date is after that
     * day that they specified.
     *
     * @param departing the component that had the event fired
     * @param date the date that was selected by the user
     */
    departing: function (departing, date) {
        // get the returning date component
        // get the date for tomorrow
        // set the minimum value of the returning date component
        var returning = this.getView().down('#returning');
        var tomorrow = new Date(date.getTime() + (1000 * 60 * 60 * 24));
        returning.setMinValue(tomorrow);
        // check if the returning date needs to be updated
        if (returning.getValue() === null || returning.getValue().getTime() < date.getTime()) {
            // set the value to tomorrow
            returning.setValue(tomorrow);
        }

    },
	/**
	 * Submits the home controller form
	 */
	submit: function () {
		var form = this.getView();
		// check the flight details have been filled out
		if (form.isValid()) {
			var component = Ext.create('FB.view.booking.Booking', {
				flightDetails: form.getValues()
			});
			this.getView().fireEvent('redirect', {
				component: component,
				add: true
			});
		} else {
			Ext.Msg.alert('Error', 'Please ensure you have entered the flight details correctly.');
		}
	},
	/**
	 * Renders the view
	 */
	render: function () {
		try {
			this.renderMap();
		} catch (e) {
			console.error('An error occurred attempting to load the map.');
		}
	},
	/**
	 * Renders the google map to the form
	 */
	renderMap: function () {
		var map_canvas = this.getView().down('#map').getEl().dom;
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
		this.setGoogleMap(new google.maps.Map(map_canvas, map_options));
		this.getGoogleMap().set('styles', [{
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
	 * Updates the map to display the distance
	 *
	 * @param source the source airport
	 * @param target the target airport
	 */
    updateMap: function (source, target) {
        try {
	        var coords = [
		        new google.maps.LatLng(this.parseLatLng(source.get('latitude')), this.parseLatLng(source.get('longitude'))),
		        new google.maps.LatLng(this.parseLatLng(target.get('latitude')), this.parseLatLng(target.get('longitude')))
	        ];
	        var polyline = this.getPolyline();
	        var map = this.getGoogleMap();
	        if (polyline !== null) {
		        polyline.setMap(null);
	        }
	        this.setPolyline(new google.maps.Polyline({
		        path: coords,
		        strokeColor: '#FF0000',
		        strokeOpacity: 1.0,
		        strokeWeight: 2,
		        map: map
	        }));
	        var bounds = new google.maps.LatLngBounds();
	        for (var i = 0; i < coords.length; i++) {
		        bounds.extend(coords[i]);
	        }
	        map.fitBounds(bounds);
        } catch (e) {
	        console.error('Could not update the map.');
        }
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

Ext.define('FB.view.HomeController', {
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
		// add the event listeners to the form
		this.addEvents(form);
		// render the map when the dom has loaded
		Ext.onReady(function () {
			this.renderMap();
		}, this);
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
		form.down('#flightFrom').on('select', flightFrom, this);
		form.down('#flightTo').on('select', flightTo, this);
		form.down('#submit').on('click', this.submit, this);
	},
	/**
	 * Submits the home controller form
	 */
	submit: function () {
		FB.app.content.addPage('Booking');
		this.redirect('Booking');
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

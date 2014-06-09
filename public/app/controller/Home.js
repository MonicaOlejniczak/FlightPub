Ext.define('FB.controller.Home', {
	extend: 'Ext.app.Controller',
	/**
	 * Dependencies
	 */
	requires: [
		'FB.models.Airport',
		'FB.store.Airport',
		'Ext.container.Container',
		'Ext.form.Panel',
		'Ext.form.Label',
		'Ext.form.field.ComboBox',
		'Ext.form.field.Date'
	],
	views: [
		'Home'
	],
	refs: [{
		ref: 'Form',
		selector: 'Home'
	}],
	/**
	 * Initial configuration
	 */
	config: {
		map: null,
		polyline: null,
		source: null,
		target: null
	},
	/**
	 * Initialising function
	 */
	init: function () {
		Ext.widget('Home', {
			renderTo: Ext.get('home')
		});
		this.renderMap();
		this.control({
			'Home combobox[itemId=flightFrom]': {
				select: {
					fn: function (combo, newValue) {
						this.setSource(newValue[0]);
						if (this.getTarget() != null) {
							this.updateMap(this.getSource(), this.getTarget());
						}
					},
					scope: this
				}
			},
			'Home combobox[itemId=flightTo]': {
				select: {
					fn: function (combo, newValue) {
						this.setTarget(newValue[0]);
						this.updateMap(this.getSource(), this.getTarget());
					},
					scope: this
				}
			},
			'Home button[action=submit]': {
				click: {
					fn: this.submitEvent,
					scope: this
				}
			}
		}, this);
    },
	/**
	 * Submits the home controller form
	 */
	submitEvent: function () {
		var form = this.getForm();
		form.submit({
			params: {
				source: form.down('#flightFrom').getValue(),
				destination: form.down('#flightTo').getValue()
			},
			url: '/flights',
			method: 'get',
			submitEmptyText: false,
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
	},
	/**
	 * Renders the google map to the form
	 */
	renderMap: function () {
		var map_canvas = this.getForm().down('#map').getEl().dom;
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

Ext.define('FB.controllers.Home', {
	requires: [
		'FB.models.Airport',
		'FB.stores.Airport',
		'Ext.form.field.ComboBox'
	],
	map: null,
    polyline: null,
    constructor: function () {

        Ext.onReady(function () {
            this.setupMap();
            this.setupForm();
        }, this);

    },
    setupForm: function () {

        var sourceCombo = Ext.create('Ext.form.field.ComboBox', {
            store: 'FB.stores.Airport',
            model: 'FB.models.Airport',
            border: false,
            queryMode: 'remote',
            displayField: 'name',
            valueField: 'code',
            renderTo: Ext.get('flightFrom')
        });

        var targetCombo = Ext.create('Ext.form.field.ComboBox', {
            store: 'FB.stores.Airport',
            model: 'FB.models.Airport',
            border: false,
            queryMode: 'remote',
            displayField: 'name',
            valueField: 'code',
            renderTo: Ext.get('flightTo')
        });

        var source = null;
        var target = null;

        sourceCombo.on({
            'select': function (combo, newValue) {
                source = newValue[0];
            },
            scope: this
        });

        targetCombo.on({
            'select': function (combo, newValue) {
                target = newValue[0];
                this.updateMap(source, target);
            },
            scope: this
        })
    },
    updateMap: function (source, target) {

        var coords = [
            new google.maps.LatLng(this.parseLatLng(source.get('latitude')), this.parseLatLng(source.get('longitude'))),
            new google.maps.LatLng(this.parseLatLng(target.get('latitude')), this.parseLatLng(target.get('longitude'))),
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
    parseLatLng: function (input) {
        var lat = input.split(':');
        var deg = lat[0];
        var min = lat[1];
        var sec = lat[2];
        var sgn = lat[3];

        if (sgn === 'N' || sgn === 'E') {
            return deg;
        } else {
            return -deg;
        }
    },
    setupMap: function () {
        var map_canvas = Ext.get('map').dom;
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
        /*var lastValidCenter = map.getCenter();

         google.maps.event.addListener(map, 'center_changed', function () {
         if (bounds.contains(map.getCenter())) {
         lastValidCenter = map.getCenter();
         return;
         }
         map.panTo(lastValidCenter);
         });*/

        map.set('styles', [
            {
                elementType: 'labels',
                stylers: [
                    {
                        visibility: 'off'
                    }
                ]
            },
            {
                featureType: 'water',
                stylers: [
                    {
                        color: '#ffffff'
                    }
                ]
            },
            {
                featureType: 'landscape',
                stylers: [
                    {
                        color: '#333333'
                    }
                ]
            },
            {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [
                    {
                        color: '#000000',
                        weight: 1.6,
                        visibility: 'simplified'
                    }
                ]
            },
            {
                featureType: 'administrative',
                elementType: 'geometry',
                stylers: [
                    {
                        visibility: 'off'
                    }
                ]
            },
            {
                featureType: 'poi',
                elementType: 'all',
                stylers: [
                    {
                        visibility: 'off'
                    }
                ]
            }
        ]);
    }
});

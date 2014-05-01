function initialize() {
	var map_canvas = document.getElementById('map');
	var map_options = {
		center: new google.maps.LatLng(30, -85),
		zoom: 2,
		minZoom: 2,
		maxZoom: 5,
		panControl: false,
		zoomControl: false,
		mapTypeControl: false,
		streetViewControl: false,
		overviewMapControl: false,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	// todo fix bounds for zooming, kk brendan
	var bounds = new google.maps.LatLngBounds(
		new google.maps.LatLng(-50, -127.50),
		new google.maps.LatLng(65, 55.90)
	);

	var map = new google.maps.Map(map_canvas, map_options);
	var lastValidCenter = map.getCenter();

	google.maps.event.addListener(map, 'center_changed', function() {
		if (bounds.contains(map.getCenter())) {
			lastValidCenter = map.getCenter();
			return;
		}
		map.panTo(lastValidCenter);
	});

	map.set('styles', [{
		featureType: 'water',
		elementType: 'geometry',
		stylers: [
			{color: '#0b1f3a'},
			{weight: 1.6}
		]
	},  {
		featureType: 'water',
		elementType: 'labels',
		stylers: [
			{visibility: 'off'}
		]
	},  {
		featureType: 'road',
		elementType: 'geometry',
		stylers: [
			{color: '#000'},
			{weight: 1.6},
			{visibility: "simplified"}
		]
	},  {
		featureType: 'road',
		elementType: 'labels',
		stylers: [
			{color: '#000'}
		]
	},  {
		featureType: 'road',
		elementType: 'labels.icon',
		stylers: [
		{visibility: "off"}
		]
	},  {
		featureType: 'landscape',
		elementType: 'geometry',
		stylers: [
			{hue: '#fff'},
			{gamma: 1.4},
			{saturation: 50},
			{lightness: 80}
		]
	},  {
		featureType: "administrative",
		elementType: "geometry",
		stylers: [
			{visibility: "off"}
		]
	},  {
		featureType: 'poi',
		elementType: 'all',
		stylers: [
			{visibility: 'off'}
		]
	}
	]);
}

google.maps.event.addDomListener(window, 'load', initialize);


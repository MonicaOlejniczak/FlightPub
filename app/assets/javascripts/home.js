function initialize() {
	var map_canvas = document.getElementById('map');
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

	var map = new google.maps.Map(map_canvas, map_options);
	var lastValidCenter = map.getCenter();

	google.maps.event.addListener(map, 'center_changed', function () {
		if (bounds.contains(map.getCenter())) {
			lastValidCenter = map.getCenter();
			return;
		}
		map.panTo(lastValidCenter);
	});

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

google.maps.event.addDomListener(window, 'load', initialize);


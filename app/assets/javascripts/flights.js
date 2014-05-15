function init() {


}

/**
 * Sorting the search results
 */
function removeSortSelected() {
	var selected = document.getElementsByClassName('sortSelected')
	for (var i = 0; i < selected.length; i++) {
		selected[i].className = '';
	}
}

function sortPrice() {
	this.removeSortSelected();
	document.getElementById('sortPrice').className = 'sortSelected';
}

function sortDuration() {
	this.removeSortSelected();
	document.getElementById('sortDuration').className = 'sortSelected';
}

function sortDepartureTime() {
	this.removeSortSelected();
	document.getElementById('sortDepartureTime').className = 'sortSelected';
}

function sortArrivalTime() {
	this.removeSortSelected();
	document.getElementById('sortArrivalTime').className = 'sortSelected';
}

function sortStopOvers() {
	this.removeSortSelected();
	document.getElementById('sortStopOvers').className = 'sortSelected';
}

function sortAirline() {
	this.removeSortSelected();
	document.getElementById('sortAirline').className = 'sortSelected';
}

function sortClass() {
	this.removeSortSelected();
	document.getElementById('sortClass').className = 'sortSelected';
}

/**
 * Filtering the search results
 */

function filter(id) {
	var element = document.getElementById(id);
	element.className = element.className == 'filterSelected' ? '' : 'filterSelected';
}

function filterNone() {
	document.getElementById('filterPrice').className = '';
	document.getElementById('filterDuration').className = '';
	document.getElementById('filterDepartureTime').className = '';
	document.getElementById('filterArrivalTime').className = '';
	document.getElementById('filterStopOvers').className = '';
	document.getElementById('filterAirline').className = '';
	document.getElementById('filterClass').className = '';
}

function filterPrice() {
	this.filter('filterPrice');
}

function filterDuration() {
	this.filter('filterDuration');
}

function filterDepartureTime() {
	this.filter('filterDepartureTime');
}

function filterArrivalTime() {
	this.filter('filterArrivalTime');
}

function filterStopOvers() {
	this.filter('filterStopOvers');
}

function filterAirline() {
	this.filter('filterAirline');
}

function filterClass() {
	this.filter('filterClass');
}

function filterAll() {
	document.getElementById('filterPrice').className = 'filterSelected';
	document.getElementById('filterDuration').className = 'filterSelected';
	document.getElementById('filterDepartureTime').className = 'filterSelected';
	document.getElementById('filterArrivalTime').className = 'filterSelected';
	document.getElementById('filterStopOvers').className = 'filterSelected';
	document.getElementById('filterAirline').className = 'filterSelected';
	document.getElementById('filterClass').className = 'filterSelected';
}

window.addEventListener('load', init);

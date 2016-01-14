/**
 * @author Monica Olejniczak
 */
Ext.define('FB.view.booking.flights.sort.SortController', {
    extend: 'Ext.app.ViewController',
    id: 'FlightsSort',
    alias: 'controller.FlightsSort',
    requires: [
        'FB.sorter.ArrivalTime',
        'FB.sorter.DepartureTime',
        'FB.sorter.Duration',
        'FB.sorter.Price',
        'FB.sorter.StopOver'
    ],
    config: {
        lastSortedBy: null,
        arrivalTimeSorter: Ext.create('FB.sorter.ArrivalTime'),
        departureTimeSorter: Ext.create('FB.sorter.DepartureTime'),
        durationSorter: Ext.create('FB.sorter.Duration'),
        priceSorter: Ext.create('FB.sorter.Price'),
        stopOverSorter: Ext.create('FB.sorter.StopOver')
    },
    control: {
        '#price': {
            click: function (e) {
                this.sort(e.id, this.getPriceSorter());
            }
        },
        '#duration': {
            click: function (e) {
                this.sort(e.id, this.getDurationSorter());
            }
        },
        '#departureTime': {
            click: function (e) {
                this.sort(e.id, this.getDepartureTimeSorter());
            }
        },
        '#arrivalTime': {
            click: function (e) {
                this.sort(e.id, this.getArrivalTimeSorter());
            }
        },
        '#stopOvers': {
            click: function (e) {
                this.sort(e.id, this.getStopOverSorter());
            }
        }
    },
    init: function () {
        var view = this.getView();
        //this.sort.apply(this, ['sortPrice', this.priceSorter]);
    },
    /**
     * This method sorts the search results by first removing any selected classes and applying it to the correct
     * flight. It then retrieves the parent element where the children (the sorted data) are stored and appends a
     * specific flight div into the parent into the correct order.
     *
     * @param id the id of the component that was clicked
     * @param sorter the sorter being passed to the function
     */
    sort: function (id, sorter) {
        Ext.select('.sortSelected').removeCls('sortSelected');
        Ext.get(id).addCls('sortSelected');
        if (id == this.getLastSortedBy()) {
            sorter.toggle();
            /*this.dataStore.sorters.each(function (sorter) {
                sorter.toggle();
            });*/
        }
        this.getView().fireEvent('sort', sorter);
        this.setLastSortedBy(id);
    }

});

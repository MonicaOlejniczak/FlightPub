describe("The flights page", function () {
    Ext.syncRequire([
        'Mock.store.ItineraryMock',
        'FB.view.booking.BookingProcess',
        'FB.view.booking.flights.Flights',
        'FB.sorter.ArrivalTime',
        'FB.sorter.DepartureTime',
        'FB.sorter.Price',
        'FB.sorter.StopOver',
        'FB.sorter.Duration'
    ]);

    // create mock stores
    Ext.create('Mock.store.ItineraryMock');

    beforeEach(function (done) {
        // create a home view
        this.view = Ext.create('FB.view.booking.BookingProcess', {
            flightDetails: {
                source: "Sydney",
                destination: "Brisbane",
                adults: 1,
                children: 0,
                infants: 0,
                departing: new Date(),
                returning: new Date()
            }
        });

        this.flightsView = this.view.down('#booking').getLayout().getActiveItem();
        this.flightsController = this.flightsView.getController();
        this.flightsController.getDataStore().on('load', function () {
            done();
        }, this);
    });

    function checkSorted(store, fieldName, asc) {
        for (var i = 0; i < store.getTotalCount() - 1; i++) {
            var first = store.getAt(i);
            var second = store.getAt(i + 1);
            expect(
                asc
                ? first.get(fieldName) <= second.get(fieldName)
                : first.get(fieldName) >= second.get(fieldName)
            ).toBeTrue();
        }
    }

    it("sorting by arrival time orders store data by arrival time", function () {
        var sorter = Ext.create('FB.sorter.ArrivalTime');
        this.flightsController.sort(sorter);
        var store = this.flightsController.getDataStore();
        checkSorted(store, 'arrivalTime', true);
    });

    it("sorting by departure time orders store data by departure time", function () {
        var sorter = Ext.create('FB.sorter.DepartureTime');
        this.flightsController.sort(sorter);
        var store = this.flightsController.getDataStore();
        checkSorted(store, 'departureTime', true);
    });

    it("sorting by price orders store data by price", function () {
        var sorter = Ext.create('FB.sorter.Price');
        this.flightsController.sort(sorter);
        var store = this.flightsController.getDataStore();
        checkSorted(store, 'price', true);
    });

    it("sorting by stopovers orders store data by number of stopovers", function () {
        var sorter = Ext.create('FB.sorter.StopOver');
        this.flightsController.sort(sorter);
        var store = this.flightsController.getDataStore();
        checkSorted(store, 'stopOvers', true);
    });

    it("sorting by duration orders store data by number of duration", function () {
        var sorter = Ext.create('FB.sorter.Duration');
        this.flightsController.sort(sorter);
        var store = this.flightsController.getDataStore();
        checkSorted(store, 'duration', true);
    });

});


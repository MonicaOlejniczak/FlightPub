ddescribe("The flights page", function () {
    // create mock stores
    Ext.syncRequire('Mock.store.ItineraryMock');
    Ext.create('Mock.store.ItineraryMock');

    // create a home view
    var view = Ext.create('FB.view.booking.BookingProcess', {
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

    it("Dummy", function () {
        expect(4).toBe(2 + 2);
    });

});


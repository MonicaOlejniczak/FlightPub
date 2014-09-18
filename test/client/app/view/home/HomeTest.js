describe("The home page", function () {
    // create mock stores
    var airports = Ext.create('Mock.store.AirportMock');
    Ext.create('Mock.store.AdultMock');
    Ext.create('Mock.store.ChildMock');
    Ext.create('Mock.store.InfantMock');

    // create a home view
    var view = Ext.create('FB.view.home.Home');

    function setValue(component, value) {
        component.setValue(value);
        if (value !== "" && value !== null) {
            component.fireEvent('select', component, component.getValue());
        }
    }

    describe("has a departing and returning drop-down menu", function () {

        // create some dates to test with
        var todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);

        var todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999);

        var tomorrow = new Date();
        tomorrow.setTime(tomorrow.getTime() + 1000 * 60 * 60 * 24);

        var tomorrowStart = new Date(tomorrow.getTime());
        tomorrowStart.setHours(0, 0, 0, 0);

        var tomorrowEnd = new Date(tomorrow.getTime());
        tomorrowEnd.setHours(23, 59, 59, 999);

        var afterTomorrowEnd = new Date();
        afterTomorrowEnd.setTime(afterTomorrowEnd.getTime() + 1000 * 60 * 60 * 24 * 2);
        afterTomorrowEnd.setHours(23, 59, 59, 999);

        // get the departing and returning combo boxes
        var departing = view.down("#departing");
        var returning = view.down("#returning");

        it("should not allow dates before today", function () {
            var minDate = departing.minValue;
            expect(minDate).toBeDate();
            expect(minDate).toBeAfter(todayStart);
            expect(minDate).toBeBefore(todayEnd);
        });

        it("should not allow returning dates to be before the departing date", function () {
            // simulate setting the departing date for tomorrow
            departing.setValue(tomorrow);
            // fake firing the select event
            departing.fireEvent('select', departing, departing.getValue());

            // see if the min date for the returning combobox has changed
            var minDate = returning.minValue;
            expect(minDate).toBeDate();
            expect(minDate).toBeAfter(tomorrowEnd);
            expect(minDate).toBeBefore(afterTomorrowEnd);
        });

    });

    describe("has a form submission", function () {

        var controller = view.getController();

        var flightFrom = view.down("#flightFrom");
        var flightTo = view.down("#flightTo");
        var departing = view.down("#departing");
        var returning = view.down("#returning");
        var adults = view.down('#adultPassengers').down('#adults');
        var children = view.down('#childPassengers').down('#children');
        var infants = view.down('#infantPassengers').down('#infants');

        var today = new Date();
        var tomorrow = new Date(today.getTime() + (1000 * 60 * 60 * 24));

        it("does not submit when there is no data", function () {
            expect(view.isValid()).toBe(false);
        });

        it("does not submit when there is no flight from", function () {
            flightFrom.setValue("");
            flightTo.setValue(airports.findRecord('name', 'Sydney').get('name'));
            setValue(departing, today);
            setValue(returning, tomorrow);
            setValue(adults, 1);
            setValue(children, 0);
            setValue(infants, 0);
            expect(view.isValid()).toBe(false);
        });

        it("does not submit when there is no flight to", function () {
            flightFrom.setValue(airports.findRecord('name', 'Sydney').get('name'));
            flightTo.setValue("");
            setValue(departing, today);
            setValue(returning, tomorrow);
            setValue(adults, 1);
            setValue(children, 0);
            setValue(infants, 0);
            expect(view.isValid()).toBe(false);
        });

        it("does not submit when the flight from and flight to are the same", function () {
            flightFrom.setValue(airports.findRecord('name', 'Sydney').get('name'));
            flightTo.setValue(airports.findRecord('name', 'Sydney').get('name'));
            setValue(departing, today);
            setValue(returning, tomorrow);
            setValue(adults, 1);
            setValue(children, 0);
            setValue(infants, 0);
            expect(view.isValid()).toBe(false);
        });

        it("does not submit when there is no departing", function () {
            flightFrom.setValue(airports.findRecord('name', 'Sydney').get('name'));
            flightTo.setValue(airports.findRecord('name', 'Canberra').get('name'));
            setValue(departing, "");
            setValue(returning, tomorrow);
            setValue(adults, 1);
            setValue(children, 0);
            setValue(infants, 0);
            expect(view.isValid()).toBe(false);
        });

        it("does not submit when there is no returning", function () {
            flightFrom.setValue(airports.findRecord('name', 'Sydney').get('name'));
            flightTo.setValue(airports.findRecord('name', 'Canberra').get('name'));
            setValue(departing, today);
            setValue(returning, "");
            setValue(adults, 1);
            setValue(children, 0);
            setValue(infants, 0);
            expect(view.isValid()).toBe(false);
        });

        it("does not submit when there are no passengers", function () {
            flightFrom.setValue(airports.findRecord('name', 'Sydney').get('name'));
            flightTo.setValue(airports.findRecord('name', 'Canberra').get('name'));
            setValue(departing, today);
            setValue(returning, tomorrow);
            setValue(adults, 0);
            setValue(children, 0);
            setValue(infants, 0);
            expect(view.isValid()).toBe(false);
        });

        it("submits with valid data", function () {
            flightFrom.setValue(airports.findRecord('name', 'Sydney').get('name'));
            flightTo.setValue(airports.findRecord('name', 'Canberra').get('name'));
            setValue(departing, today);
            setValue(returning, tomorrow);
            setValue(adults, 1);
            setValue(children, 0);
            setValue(infants, 0);
            expect(view.isValid()).toBe(true);
        });
    });
});
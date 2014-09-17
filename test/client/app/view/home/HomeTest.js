describe("The home page", function () {
    Ext.create('Mock.store.AirportMock');
    Ext.create('Mock.store.AdultMock');
    Ext.create('Mock.store.ChildMock');
    Ext.create('Mock.store.InfantMock');

    var view = Ext.create('FB.view.home.Home');

    describe("has a departing and returning drop-down menu", function () {

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

        var departing = view.down("#departing");
        var returning = view.down("#returning");

        it("should not allow dates before today", function () {
            var minDate = departing.minValue;
            expect(minDate).toBeDate();
            expect(minDate).toBeAfter(todayStart);
            expect(minDate).toBeBefore(todayEnd);
        });

        it("should not allow returning dates to be before the departing date", function () {
            departing.setValue(tomorrow);
            departing.fireEvent('select', departing, departing.getValue());
            var minDate = returning.minValue;
            expect(minDate).toBeAfter(tomorrowEnd);
            expect(minDate).toBeBefore(afterTomorrowEnd);
        });

    });

    describe("has a form submission", function () {
        it("does not submit when there is no data", function () {

        });

        it("does not submit when there is no flight from", function () {

        });

        it("does not submit when there is no flight to", function () {

        });

        it("does not submit when the flight from and flight to are the same", function () {

        });

        it("does not submit when there is no departing", function () {

        });

        it("does not submit when there is no returning", function () {

        });

        it("does not submit when there are no passengers", function () {

        });

        it("submits with valid data", function () {

        });
    });
});
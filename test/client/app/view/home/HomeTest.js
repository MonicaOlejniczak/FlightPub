/**
 * @author Brendan Annable
 * @author Monica Olejniczak
 */
describe("The home page", function () {
    Ext.syncRequire([
        'Mock.store.AirportMock',
        'Mock.store.AdultMock',
        'Mock.store.ChildMock',
        'Mock.store.InfantMock',
        'FB.view.home.Home'
    ]);

    // create mock stores
    var airports = Ext.create('Mock.store.AirportMock');
    Ext.create('Mock.store.AdultMock');
    Ext.create('Mock.store.ChildMock');
    Ext.create('Mock.store.InfantMock');

    // create a home view
    var view = Ext.create('FB.view.home.Home');

    function setValue(component, value) {
        component.setValue(value);
        if (value !== '' && value !== null) {
            component.fireEvent('select', component, component.getValue());
        }
    }

    describe('has a departing and returning drop-down menu', function () {

        beforeEach(function () {
            this.view = Ext.create('FB.view.home.Home');
            // create some dates to test with
            this.todayStart = new Date();
            this.todayStart.setHours(0, 0, 0, 0);

            this.todayEnd = new Date();
            this.todayEnd.setHours(23, 59, 59, 999);

            this.tomorrow = new Date();
            this.tomorrow.setTime(this.tomorrow.getTime() + 1000 * 60 * 60 * 24);

            this.tomorrowStart = new Date(this.tomorrow.getTime());
            this.tomorrowStart.setHours(0, 0, 0, 0);

            this.tomorrowEnd = new Date(this.tomorrow.getTime());
            this.tomorrowEnd.setHours(23, 59, 59, 999);

            this.afterTomorrowEnd = new Date();
            this.afterTomorrowEnd.setTime(this.afterTomorrowEnd.getTime() + 1000 * 60 * 60 * 24 * 2);
            this.afterTomorrowEnd.setHours(23, 59, 59, 999);

            // get the departing and returning combo boxes
            this.departing = this.view.down('#departing');
            this.returning = this.view.down('#returning');
        });

        it('should not allow dates before today', function () {
            var minDate = this.departing.minValue;
            expect(minDate).toBeDate();
            expect(minDate).toBeAfter(this.todayStart);
            expect(minDate).toBeBefore(this.todayEnd);
        });

        it('should not allow returning dates to be before the departing date', function () {
            // simulate setting the departing date for tomorrow
            this.departing.setValue(this.tomorrow);
            // fake firing the select event
            this.departing.fireEvent('select', this.departing, this.departing.getValue());

            // see if the min date for the returning combobox has changed
            var minDate = this.returning.minValue;
            expect(minDate).toBeDate();
            expect(minDate).toBeAfter(this.tomorrowEnd);
            expect(minDate).toBeBefore(this.afterTomorrowEnd);
        });

    });

    describe('has a form submission', function () {

        beforeEach(function() {

            this.view = Ext.create('FB.view.home.Home');
            this.flightFrom = this.view.down('#flightFrom');
            this.flightTo = this.view.down('#flightTo');
            this.departing = this.view.down('#departing');
            this.returning = this.view.down('#returning');
            this.adults = this.view.down('#adultPassengers').down('#adults');
            this.children = this.view.down('#childPassengers').down('#children');
            this.infants = this.view.down('#infantPassengers').down('#infants');

            var today = new Date();
            var tomorrow = new Date(today.getTime() + (1000 * 60 * 60 * 24));

            this.flightFrom.setValue(airports.findRecord('name', 'Sydney').get('name'));
            this.flightTo.setValue(airports.findRecord('name', 'Canberra').get('name'));
            setValue(this.departing, today);
            setValue(this.returning, tomorrow);
            setValue(this.adults, 1);
            setValue(this.children, 0);
            setValue(this.infants, 0);

        });

        it('does not submit when there is no data', function () {
            setValue(this.flightFrom, '');
            setValue(this.flightTo, '');
            setValue(this.departing, '');
            setValue(this.returning, '');
            setValue(this.adults, 0);
            setValue(this.children, 0);
            setValue(this.infants, 0);
            expect(this.view.isValid()).toBeFalse();
        });

        it('does not submit when there is no flight from', function () {
            setValue(this.flightFrom, '');
            expect(this.view.isValid()).toBeFalse();
        });

        it('does not submit when there is no flight to', function () {
            setValue(this.flightTo, '');
            expect(this.view.isValid()).toBeFalse();
        });

        it('does not submit when the flight from and flight to are the same', function () {
            setValue(this.flightFrom, airports.findRecord('name', 'Sydney').get('name'));
            setValue(this.flightTo, airports.findRecord('name', 'Sydney').get('name'));
            expect(this.view.isValid()).toBeFalse();
        });

        it('does not submit when there is no departing', function () {
            setValue(this.departing, '');
            expect(this.view.isValid()).toBeFalse();
        });

        it('does not submit when there is no returning', function () {
            setValue(this.returning, '');
            expect(this.view.isValid()).toBeFalse();
        });

        it('does not submit when there are no passengers', function () {
            setValue(this.adults, 0);
            setValue(this.children, 0);
            setValue(this.infants, 0);
            expect(this.view.isValid()).toBeFalse();
        });

        it('submits with valid data', function () {
            expect(this.view.isValid()).toBeTrue();
        });
    });
});
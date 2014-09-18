describe('The passengers page', function () {

    Ext.create('Mock.store.LuggageTypeMock');
    Ext.create('Mock.store.TicketTypeMock');

    /**
     * Creates a passengers view with the amount of passengers specified.
     *
     * @param amount The amount of passengers to render.
     * @returns {FB.view.booking.passengers.Passengers}
     */
    function createPassengersView (amount) {
        return Ext.create('FB.view.booking.passengers.Passengers', {
            passengers: amount
        });
    }

    /**
     * Retrieves the passengers view from the main view
     *
     * @param view The main view to retrieve the passengers from
     */
    function getPassengers (view) {
        return view.down('#passengers');
    }

    /**
     * Calculates the amount of passengers within a passengers view.
     *
     * @param view The main view which contains the passengers.
     * @returns {*}
     */
    function getPassengerAmount (view) {
        var passengers = getPassengers(view);   // calculates the passengers view
        return passengers.items.items.length;   // returns the amount of passengers within the view
    }

    /**
     * Sets the values of the passengers using an array of data.
     *
     * @param view The main view that contains the passengers view
     * @param data The data set array
     */
    function setValues (view, data) {
        var passengers = getPassengers(view);
        var i = 0;
        passengers.items.each(function (passenger) {
            passenger.down('FirstName').setValue(data[i]);
            passenger.down('LastName').setValue(data[i + 1]);
            passenger.down('TicketType').setValue(data[i + 2]);
            passenger.down('LuggageType').setValue(data[i + 3]);
            i += 4;
        });
    }

    describe('generates the passengers', function () {

        it('the amount of passengers chosen matches what is displayed', function () {

            // tests the first ten passenger amounts are correctly generated
            for (var i = 1; i <= 10; i++) {
                var view = createPassengersView(i);
                var passengerAmount = getPassengerAmount(view);
                expect(passengerAmount).toEqual(i);
            }

        });

    });

    describe('has a form submission', function () {

        it('does not submit when there is no data', function () {
            var view = createPassengersView(1);
            expect(view.isValid()).toBeFalse();
        });

        it('does submit with valid data', function () {
            var view = createPassengersView(1);
            var data = ['John', 'Smith', 'Economy', 'Only Carry-On Luggage'];
            setValues(view, data);
            expect(view.isValid()).toBeTrue();
        });

        describe('each passenger has a first name', function () {

            /**
             * Sets the values of the passengers first names using an array of data.
             *
             * @param view The main view that contains the passengers view
             * @param data The data set array containing the first name's
             */
            function setFirstName (view, data) {
                var passengers = getPassengers(view);
                passengers.items.each(function (passenger, i) {
                    passenger.down('FirstName').setValue(data[i]);
                });
            }

            beforeEach(function () {
                this.view = createPassengersView(3);
                var data = [
                    '', 'Smith', 'Economy', 'Only Carry-On Luggage',
                    '', 'Smith', 'Economy', 'Only Carry-On Luggage',
                    '', 'Smith', 'Economy', 'Only Carry-On Luggage'
                ];
                setValues(this.view, data);
            });

            it('does not submit when any value is empty', function () {
                setFirstName(this.view, ['', '', '']);
                expect(this.view.isValid()).toBeFalse();
            });

            it('does not submit when a value is more than 30 characters', function () {
                setFirstName(this.view, ['abcdefghijklmnopqrstuvwxyz12345', 'John', 'Allana']);
                expect(this.view.isValid()).toBeFalse();
            });

            it('does submit when a value is 30 characters', function () {
                setFirstName(this.view, ['abcdefghijklmnopqrstuvwxyz1234', 'John', 'Allana']);
                expect(this.view.isValid()).toBeTrue();
            });

            it('does submit when a value is one character', function () {
                setFirstName(this.view, ['a', 'John', 'Allana']);
                expect(this.view.isValid()).toBeTrue();
            });

            it('does submit when a value is less than 30 characters', function () {
                setFirstName(this.view, ['abc', 'John', 'Allana']);
                expect(this.view.isValid()).toBeTrue();
            });

            it('does submit when its value contains lower case letters', function () {
                setFirstName(this.view, ['abc', 'John', 'Allana']);
                expect(this.view.isValid()).toBeTrue();
            });

            it('does submit when its value contains upper case letters', function () {
                setFirstName(this.view, ['SBC', 'John', 'Allana']);
                expect(this.view.isValid()).toBeTrue();
            });

            it('does submit when its value contains both upper and lower case letters', function () {
                setFirstName(this.view, ['John', 'John', 'Allana']);
                expect(this.view.isValid()).toBeTrue();
            });

        });

        describe('each passenger has a last name', function () {

            /**
             * Sets the values of the passengers last names using an array of data.
             *
             * @param view The main view that contains the passengers view
             * @param data The data set array containing the last name's
             */
            function setLastName (view, data) {
                var passengers = getPassengers(view);
                passengers.items.each(function (passenger, i) {
                    passenger.down('LastName').setValue(data[i]);
                });
            }

            beforeEach(function () {
                this.view = createPassengersView(3);
                var data = [
                    'John', '', 'Economy', 'Only Carry-On Luggage',
                    'Allana', '', 'Economy', 'Only Carry-On Luggage',
                    'Miriam', '', 'Economy', 'Only Carry-On Luggage'
                ];
                setValues(this.view, data);
            });

            it('does not submit when any value is empty', function () {
                setLastName(this.view, ['', '', '']);
                expect(this.view.isValid()).toBeFalse();
            });

            it('does not submit when a value is more than 30 characters', function () {
                setLastName(this.view, ['abcdefghijklmnopqrstuvwxyz12345', 'Smith', 'Smith']);
                expect(this.view.isValid()).toBeFalse();
            });

            it('does submit when a value is 30 characters', function () {
                setLastName(this.view, ['abcdefghijklmnopqrstuvwxyz1234', 'Smith', 'Smith']);
                expect(this.view.isValid()).toBeTrue();
            });

            it('does submit when a value is one character', function () {
                setLastName(this.view, ['a', 'Smith', 'Smith']);
                expect(this.view.isValid()).toBeTrue();
            });

            it('does submit when a value is less than 30 characters', function () {
                setLastName(this.view, ['abc', 'Smith', 'Smith']);
                expect(this.view.isValid()).toBeTrue();
            });

            it('does submit when its value contains lower case letters', function () {
                setLastName(this.view, ['abc', 'Smith', 'Smith']);
                expect(this.view.isValid()).toBeTrue();
            });

            it('does submit when its value contains upper case letters', function () {
                setLastName(this.view, ['ABC', 'Smith', 'Smith']);
                expect(this.view.isValid()).toBeTrue();
            });

            it('does submit when its value contains both upper and lower case letters', function () {
                setLastName(this.view, ['John', 'Smith', 'Smith']);
                expect(this.view.isValid()).toBeTrue();
            });

        });

        describe('each passenger has a ticket type', function () {

            /**
             * Sets the values of the passengers ticket type using an array of data.
             *
             * @param view The main view that contains the passengers view
             * @param data The data set array containing the ticket types
             */
            function setTicketType (view, data) {
                var passengers = getPassengers(view);
                passengers.items.each(function (passenger, i) {
                    passenger.down('TicketType').setValue(data[i]);
                });
            }

            beforeEach(function () {
                this.view = createPassengersView(4);
                var data = [
                    'John', 'Smith', '', 'Only Carry-On Luggage',
                    'Allana', 'Smith', '', 'Only Carry-On Luggage',
                    'Miriam', 'Smith', '', 'Only Carry-On Luggage',
                    'Trent', 'Smith', '', 'Only Carry-On Luggage'
                ];
                setValues(this.view, data);
            });

            it('does not submit when any value is empty', function () {
                setTicketType(this.view, ['', '', '', '']);
                expect(this.view.isValid()).toBeFalse();
            });

            it('does submit when all ticket types are economy', function () {
                setTicketType(this.view, ['Economy', 'Economy', 'Economy', 'Economy']);
                expect(this.view.isValid()).toBeTrue();
            });

            it('does submit when all ticket types are premium economy', function () {
                setTicketType(this.view, ['Premium Economy', 'Premium Economy', 'Premium Economy', 'Premium Economy']);
                expect(this.view.isValid()).toBeTrue();
            });

            it('does submit when all ticket types are business class', function () {
                setTicketType(this.view, ['Business Class', 'Business Class', 'Business Class', 'Business Class']);
                expect(this.view.isValid()).toBeTrue();
            });

            it('does submit when all ticket types are first class', function () {
                setTicketType(this.view, ['First Class', 'First Class', 'First Class', 'First Class']);
                expect(this.view.isValid()).toBeTrue();
            });

            it('does submit when all ticket types are different', function () {
                setTicketType(this.view, ['Economy', 'Premium Economy', 'Business Class', 'First Class']);
                expect(this.view.isValid()).toBeTrue();
            });

        });

        describe('each passenger has a luggage type', function () {

            /**
             * Sets the values of the passengers ticket type using an array of data.
             *
             * @param view The main view that contains the passengers view
             * @param data The data set array containing the ticket types
             */
            function setLuggageType (view, data) {
                var passengers = getPassengers(view);
                passengers.items.each(function (passenger, i) {
                    passenger.down('LuggageType').setValue(data[i]);
                });
            }

            beforeEach(function () {
                this.view = createPassengersView(2);
                var data = [
                    'John', 'Smith', 'Economy', '',
                    'Allana', 'Smith', 'Economy', ''
                ];
                setValues(this.view, data);
            });

            it('does not submit when any value is empty', function () {
                setLuggageType(this.view, ['', '']);
                expect(this.view.isValid()).toBeFalse();
            });

            it('does submit when all values are only carry-on', function () {
                setLuggageType(this.view, ['Only Carry-On Luggage', 'Only Carry-On Luggage']);
                expect(this.view.isValid()).toBeTrue();
            });

            it('does submit when all values are carry-on with checked baggage', function () {
                setLuggageType(this.view, ['Carry-On Plus Checked Baggage', 'Carry-On Plus Checked Baggage']);
                expect(this.view.isValid()).toBeTrue();
            });

            it('does submit when all values are different', function () {
                setLuggageType(this.view, ['Only Carry-On Luggage', 'Carry-On Plus Checked Baggage']);
                expect(this.view.isValid()).toBeTrue();
            });

        });

    });

});
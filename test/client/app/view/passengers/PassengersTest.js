describe("The passengers page", function () {

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

    describe("generates the passengers", function () {

        it("the amount of passengers chosen matches what is displayed", function () {

            /**
             * Returns the amount of passengers that should be created.
             *
             * @param amount The amount of passengers to create.
             * @returns {*}
             */
            function testPassengerAmount (amount) {
                var view = createPassengersView(amount);
                return getPassengerAmount(view);
            }

            expect(testPassengerAmount(1)).toEqual(1);
            expect(testPassengerAmount(2)).toEqual(2);
            expect(testPassengerAmount(3)).toEqual(3);
            expect(testPassengerAmount(4)).toEqual(4);
            expect(testPassengerAmount(5)).toEqual(5);
            expect(testPassengerAmount(6)).toEqual(6);
            expect(testPassengerAmount(7)).toEqual(7);
            expect(testPassengerAmount(8)).toEqual(8);
            expect(testPassengerAmount(9)).toEqual(9);
            expect(testPassengerAmount(10)).toEqual(10);

        });

    });

    describe("has a form submission", function () {

        it("does not submit when there is no data", function () {
            var view = createPassengersView(1);
            expect(view.isValid()).toBeFalse();
        });

        it("does submit with valid data", function () {
            var view = createPassengersView(1);
            var data = ['John', 'Smith', 'Economy', 'Only Carry-On Luggage'];
            setValues(view, data);
            expect(view.isValid()).toBeTrue();
        });

        describe("each passenger has a first name", function () {

            var view = createPassengersView(3);
            var data = [
                '', 'Smith', 'Economy', 'Only Carry-On Luggage',
                '', 'Smith', 'Economy', 'Only Carry-On Luggage',
                '', 'Smith', 'Economy', 'Only Carry-On Luggage'
            ];

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

            /**
             * Sets the default values before each test
             */
            beforeEach(function () {
                setValues(view, data);
            });

            it("does not submit when any value is empty", function () {
                setFirstName(view, ['', '', '']);
                expect(view.isValid()).toBeFalse();
            });

            it("does not submit when a value is more than 30 characters", function () {
                setFirstName(view, ['abcdefghijklmnopqrstuvwxyz12345', 'John', 'Allana']);
                expect(view.isValid()).toBeFalse();
            });

            it("does submit when a value is 30 characters", function () {
                setFirstName(view, ['abcdefghijklmnopqrstuvwxyz1234', 'John', 'Allana']);
                expect(view.isValid()).toBeTrue();
            });

            it("does submit when a value is one character", function () {
                setFirstName(view, ['a', 'John', 'Allana']);
                expect(view.isValid()).toBeTrue();
            });

            it("does submit when a value is less than 30 characters", function () {
                setFirstName(view, ['abc', 'John', 'Allana']);
                expect(view.isValid()).toBeTrue();
            });

            it("does submit when its value contains lower case letters", function () {
                setFirstName(view, ['abc', 'John', 'Allana']);
                expect(view.isValid()).toBeTrue();
            });

            it("does submit when its value contains upper case letters", function () {
                setFirstName(view, ['SBC', 'John', 'Allana']);
                expect(view.isValid()).toBeTrue();
            });

            it("does submit when its value contains both upper and lower case letters", function () {
                setFirstName(view, ['John', 'John', 'Allana']);
                expect(view.isValid()).toBeTrue();
            });

        });

        describe("each passenger has a last name", function () {

            var view = createPassengersView(3);
            var data = [
                'John', '', 'Economy', 'Only Carry-On Luggage',
                'Allana', '', 'Economy', 'Only Carry-On Luggage',
                'Miriam', '', 'Economy', 'Only Carry-On Luggage'
            ];

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

            /**
             * Sets the default values before each test
             */
            beforeEach(function () {
                setValues(view, data);
            });

            it("does not submit when any value is empty", function () {
                setLastName(view, ['', '', '']);
                expect(view.isValid()).toBeFalse();
            });

            it("does not submit when a value is more than 30 characters", function () {
                setLastName(view, ['abcdefghijklmnopqrstuvwxyz12345', 'Smith', 'Smith']);
                expect(view.isValid()).toBeFalse();
            });

            it("does submit when a value is 30 characters", function () {
                setLastName(view, ['abcdefghijklmnopqrstuvwxyz1234', 'Smith', 'Smith']);
                expect(view.isValid()).toBeTrue();
            });

            it("does submit when a value is one character", function () {
                setLastName(view, ['a', 'Smith', 'Smith']);
                expect(view.isValid()).toBeTrue();
            });

            it("does submit when a value is less than 30 characters", function () {
                setLastName(view, ['abc', 'Smith', 'Smith']);
                expect(view.isValid()).toBeTrue();
            });

            it("does submit when its value contains lower case letters", function () {
                setLastName(view, ['abc', 'Smith', 'Smith']);
                expect(view.isValid()).toBeTrue();
            });

            it("does submit when its value contains upper case letters", function () {
                setLastName(view, ['ABC', 'Smith', 'Smith']);
                expect(view.isValid()).toBeTrue();
            });

            it("does submit when its value contains both upper and lower case letters", function () {
                setLastName(view, ['John', 'Smith', 'Smith']);
                expect(view.isValid()).toBeTrue();
            });

        });

        describe("each passenger has a ticket type", function () {

            var view = createPassengersView(4);
            var data = [
                'John', 'Smith', '', 'Only Carry-On Luggage',
                'Allana', 'Smith', '', 'Only Carry-On Luggage',
                'Miriam', 'Smith', '', 'Only Carry-On Luggage',
                'Trent', 'Smith', '', 'Only Carry-On Luggage'
            ];

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

            /**
             * Sets the default values before each test
             */
            beforeEach(function () {
                setValues(view, data);
            });

            it("does not submit when any value is empty", function () {
                setTicketType(view, ['', '', '', '']);
                expect(view.isValid()).toBeFalse();
            });

            it("does submit when all ticket types are economy", function () {
                setTicketType(view, ['Economy', 'Economy', 'Economy', 'Economy']);
                expect(view.isValid()).toBeTrue();
            });

            it("does submit when all ticket types are premium economy", function () {
                setTicketType(view, ['Premium Economy', 'Premium Economy', 'Premium Economy', 'Premium Economy']);
                expect(view.isValid()).toBeTrue();
            });

            it("does submit when all ticket types are business class", function () {
                setTicketType(view, ['Business Class', 'Business Class', 'Business Class', 'Business Class']);
                expect(view.isValid()).toBeTrue();
            });

            it("does submit when all ticket types are first class", function () {
                setTicketType(view, ['First Class', 'First Class', 'First Class', 'First Class']);
                expect(view.isValid()).toBeTrue();
            });

            it("does submit when all ticket types are different", function () {
                setTicketType(view, ['Economy', 'Premium Economy', 'Business Class', 'First Class']);
                expect(view.isValid()).toBeTrue();
            });

        });

        describe("each passenger has a luggage type", function () {

            var view = createPassengersView(2);
            var data = [
                'John', 'Smith', 'Economy', '',
                'Allana', 'Smith', 'Economy', ''
            ];

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

            /**
             * Sets the default values before each test
             */
            beforeEach(function () {
                setValues(view, data);
            });

            it("does not submit when any value is empty", function () {
                setLuggageType(view, ['', '']);
                expect(view.isValid()).toBeFalse();
            });

            it("does submit when all values are only carry-on", function () {
                setLuggageType(view, ['Only Carry-On Luggage', 'Only Carry-On Luggage']);
                expect(view.isValid()).toBeTrue();
            });

            it("does submit when all values are carry-on with checked baggage", function () {
                setLuggageType(view, ['Carry-On Plus Checked Baggage', 'Carry-On Plus Checked Baggage']);
                expect(view.isValid()).toBeTrue();
            });

            it("does submit when all values are different", function () {
                setLuggageType(view, ['Only Carry-On Luggage', 'Carry-On Plus Checked Baggage']);
                expect(view.isValid()).toBeTrue();
            });

        });

    });

});
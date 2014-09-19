/**
 * Created by juliusskye on 19/09/2014.
 */

describe("The Flights Admin Panel", function () {
    // create mock stores
    Ext.syncRequire('Mock.store.ItineraryMock');
    Ext.create('Mock.store.ItineraryMock');

    // create a admin panel view
    var view = Ext.create('FB.view.adminpanel.flights.js', {
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

    describe('has a window'), function() {

        describe('has an add flight button', function () {

            it('adds a flight to the bottom of the grid', function () {

            });
        });

        describe('has a grid'), function(){


            it('is empty when there is no data'), function () {

            }

            describe('many rows'), function(){

                describe('each has a delete flight button', function () {

                    it('removes the corresponding flight from the grid', function () {

                    });

                });

                describe('has an edit flight popup dialog', function () {

                    describe('has a form submission', function () {

                        it('populates with the selected flights details', function () {

                        });

                        it('updates the selected flight when submitted', function () {

                        });

                    });

                });

            }

        }


    }


    });


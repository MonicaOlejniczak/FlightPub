/**
 * Created by juliusskye on 11/09/2014.
 */

// this is just testing... get it?

// describe describes a suite of tests.
    // this suite may possibly need to be renamed.
describe("Application Boot suite", function() {

    beforeEach(function() {
        // let's test that we have a viewport?
        var mockedViewport = Ext.create('FB.view.Viewport');
    });

    // it is the first test
    it("should be a viewport", function() {

        expect(this.viewport).toBe(mockedViewport);
    });
});
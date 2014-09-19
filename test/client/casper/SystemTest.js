casper.test.begin('System Test', 7, function suite(test) {
    casper.start('http://localhost:9000/', function() {
        test.assertTitle('FlightPub', 'title is as expected');
        casper.waitFor(function check () {
            return this.evaluate(function () {
                return Ext.isReady;
            })
        }, function () {
            test.assertExists('input[name=source]', 'flight source input found');
            this.sendKeys('input[name=source]', 'Sydney');
            test.assertExists('input[name=destination]', 'flight destination input found');
            this.sendKeys('input[name=destination]', 'Canberra');
            test.assertExists('input[name=departing]', 'flight departing input found');
            this.sendKeys('input[name=departing]', '09/27/2014');
            test.assertExists('input[name=returning]', 'flight returning input found');
            this.sendKeys('input[name=returning]', '09/28/2014');
            test.assertExists('a.button-blue', 'find flight button found');
        });
    });
    casper.thenClick('a.button-blue');
    casper.then(function () {
        test.assertExists('a.button-red', 'successfully navigated');
    });

    casper.run(function () {
        test.done();
    });

});


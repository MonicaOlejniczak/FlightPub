casper.test.begin('Homepage Test', 7, function suite(test) {
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
            this.sendKeys('input[name=departing]', '11/01/2014');
            test.assertExists('input[name=returning]', 'flight returning input found');
            this.sendKeys('input[name=returning]', '11/05/2014');
            test.assertExists('a.button-blue', 'find flight button found');
        });
    });
    casper.thenClick('a.button-blue');
    casper.then(function () {
        test.assertExists('a.button-red', 'successfully searched for a flight');
    });


    casper.run(function () {
        test.done();
    });

});




/**
 * Created by juliusskye on 30/10/2014.
 */

//TODO: these are coupled tightly to first run id selectors. need to make use of class selectors or XPath.

casper.test.begin('SQLInjection Test', 5, function suite(test) {
    casper.start('http://localhost:9000/', function() {
        test.assertTitle('FlightPub', 'title is as expected');
        casper.waitFor(function check() {
            return this.evaluate(function () {
                return Ext.isReady;
            })
        }, function () {
            test.assertExists('#NavigationLink-1051', 'login link found');
        });

    });

// click login link
        casper.thenClick('#NavigationLink-1051');

///////////////////////////////////////////////////////
    // repeat for each injection attempt

    casper.then( function () {


        test.assertExists('input[name=email]', 'email input exists');
        test.assertExists('input[name=password]', 'password input exists');
        test.assertExists('#button-1057', 'submit login button exists');


        casper.echo('injecting email = 1\' or \'1\' = \'1');
        casper.echo('injecting password = 1\' or \'1\' = \'1');

        casper.echo('if succeeds sql query will be: SELECT * FROM Users WHERE email=\'1\' OR \'1\' = \'1\' AND password=\'1\' OR \'1\' = \'1\' ')
        this.sendKeys('input[name=email]', '1\' or \'1\' = \'1');
        this.sendKeys('input[name=password]', '1\' or \'1\' = \'1');
    });


    casper.thenClick('#button-1057');


    //error pops up and we take screenshot
    casper.then(function(){
        this.echo('error should popup!');
        this.capture('screenshotofinjectedloginresult.png', { top: 0, left:0, width:1000, height:  4000});
    });

    // click error button and then try again

    casper.thenClick('a.button-blue');

    ///////////////////////////////////////////////////////


//    casper.then( function () {
//
//
//        casper.echo('injecting email = admin@flightpub.com');
//        casper.echo('injecting password = 1\' or \'1\' = \'1');
//
//        casper.echo('if succeeds sql query will be: SELECT * FROM Users WHERE email=\'1\' OR \'1\' = \'1\' AND password=\'1\' OR \'1\' = \'1\' ')
//        this.sendKeys('input[name=email]', '1\' or \'1\' = \'1');
//        this.sendKeys('input[name=password]', '1\' or \'1\' = \'1');
//    });
//
//
//    casper.thenClick('#button-1057');
//
//
//    //error pops up and we take screenshot
//    casper.then(function(){
//        this.echo('error should popup!');
//        this.capture('screenshotofinjectedloginresult.png', { top: 0, left:0, width:1000, height:  4000});
//    });
//
//    // click error button and then try again
//
//    casper.thenClick('a.button-blue');


    casper.run(function () {
        test.done();
    });

});

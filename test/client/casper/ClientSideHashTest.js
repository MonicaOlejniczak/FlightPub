/**
 * Created by juliusskye on 30/10/2014.
 */

casper.test.begin('ClientSideHash Test', 9, function suite(test) {
    casper.start('http://localhost:9000/', function() {
        test.assertTitle('FlightPub', 'title is as expected');
        casper.waitFor(function check () {
            return this.evaluate(function () {
                return Ext.isReady;
            })
        });

// click link to go to register page
            casper.thenClick('#NavigationLink-1050');


        casper.waitFor(function check () {
            return this.evaluate(function () {
                return Ext.isReady;
            })
        }, function () {
            // assert form and input data
            test.assertExists('input[name=firstName]', 'firstname input found');
            this.sendKeys('input[name=firstName]', 'Fred');
            test.assertExists('input[name=lastName]', 'lastname input found');
            this.sendKeys('input[name=lastName]', 'Flinstone');
            test.assertExists('input[name=accountType]', 'AccountType [name] input found');
            this.sendKeys('input[name=accountType]', 'Standard User');
            test.assertExists('input[name=email]', 'email input found');
            this.sendKeys('input[name=email]', 'fred@bedrock.com');

            var inputPassword = 'yabbadabba';
            test.assertExists('input[name=password]', 'password input found');
            this.sendKeys('input[name=password]', inputPassword);

            test.assertExists('input[name=confirmPassword]', 'confirmpassword input found');
            this.sendKeys('input[name=confirmPassword]', 'yabbadabba');
            test.assertExists('#button-1061', 'register button found');
            test.assertExists('a.button-red', 'cancel button found');

        });
    });

// submit register button
//        casper.thenClick('a.button-blue');
            casper.thenClick('#button-1061');

    casper.waitForResource('http://localhost:9000/register/process', function testResource(resource) {
        casper.echo('req found ----->' + 'register/process');
    });

    //on ajax request compare passwords
    var urls = [];
    casper.on('page.resource.requested', function(requestData, resource) {
        urls.push(decodeURI(requestData.url));
        casper.echo(decodeURI(requestData.url));
//        casper.echo(JSON.stringify(requestData));
        if(requestData.url === 'http://localhost:9000/register/process'){
            casper.echo('+++->'+requestData);
//        // check that password was hashed
        //assert request's password is different to the one initially inserted
            jsonPassword = requestData.password;
            test.assertNotEquals(jsonPassword, inputPassword);
        }
    });

//    casper.then(function() {
//        var index = -1;
//        var found = 0;
//        for (var i = 0; i < urls.length; i++)
//        {
////            index = urls[i].indexOf('http://localhost:9000/register/process');
////            if (index > -1)
////                found = found+1;
//            index = urls[i].indexOf('/register/process');
//            if (index > -1)
//                found = found+1;
//        }
//        casper.echo('found ' + found);
//        test.assert(found > 0, 'Found the register request');
//    });
//
//    casper.waitForResource('process', function testResource(resource) {
//        casper.echo('req found ----->' + resource.url);
//    });


//    casper.waitForResource('http://localhost:9000/register/process', function testResource(resource) {
//        casper.echo('req found ----->' + resource.url);
//    });

//    casper.echo(urls.length);
//    casper.echo(urls);

//    casper.waitForResource('/register/process', function testResource(resource) {
//        casper.echo('req found ----->' + resource.url);
//    });




//        casper.waitForResource('http://localhost:9000/assets/extjs/packages/ext-theme-neptune/build/resources/images/tools/tool-sprites.png', function testResource(resource) {
//            casper.echo('req found ----->' + 'tool-sprites.png');
//        });

//    //Emit "resource.requested" to capture the network request on link click
//    casper.then(function(self) {
//        var utils = require('utils');
//        var x = require('casper').selectXPath;
//        casper.click(x("//a[data-type]"));
//
//    });

//    casper.waitForResource('http://localhost:9000/register/process', function testResource(resource) {
//        casper.echo('req found ----->' + 'register/process');
//    });



    casper.then(function() {
        var index = -1;
        var found = 0;
        for (var i = 0; i < urls.length; i++)
        {
//            index = urls[i].indexOf('http://localhost:9000/register/process');
//            if (index > -1)
//                found = found+1;
            index = urls[i].indexOf('/register/process');
            if (index > -1)
                found = found+1;
        }
        casper.echo('found ' + found);
        test.assert(found > 0, 'Found the register request');
    });


        casper.run(function () {
        test.done();
    });

});
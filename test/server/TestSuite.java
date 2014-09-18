package server;

import server.controllers.DataControllerTest;
import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import server.util.algorithm.FlightFinderTest;


/**
 * Package: PACKAGE_NAME
 * Author: Tom
 * Date: 13/09/2014
 * Class: TestSuite
 * Description:
 * Methods:
 * Public:
 * Private:
 */
@RunWith(Suite.class)
@Suite.SuiteClasses({
        DataControllerTest.class,
        FlightFinderTest.class
})
public class TestSuite {

}

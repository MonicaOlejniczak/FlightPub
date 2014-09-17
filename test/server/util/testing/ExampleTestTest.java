package util.testing;

import models.Airline;
import org.junit.Test;

import java.util.List;

import static org.junit.Assert.*;
import static play.test.Helpers.*;

public class ExampleTestTest {

    ExampleTest test = new ExampleTest();
    @Test
    public void testTestOne() throws Exception {
        assertEquals(2, test.testOne());
    }

    @Test
    public void testTestTwo() throws Exception {
        assertEquals(4, test.testTwo());
    }

    @Test
    public void testTestDatabaseConnection() {
        running(fakeApplication(), new Runnable() {
            public void run() {
                List<Airline> list = test.testDatabaseConnection();
                for (int i = 0; i < list.size(); i++) {
                    System.out.println(list.get(i).name);
                }
            }
        });
    }
}
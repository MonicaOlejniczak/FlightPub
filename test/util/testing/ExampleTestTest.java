package util.testing;

import org.junit.Test;

import static org.junit.Assert.*;

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
}
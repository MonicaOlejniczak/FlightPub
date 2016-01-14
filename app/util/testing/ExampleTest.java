package util.testing;

import models.Airline;

import java.util.List;

public class ExampleTest {

    public int testOne() {
        return 1 + 1;
    }

    public int testTwo() {
        return 2 + 2;

    }

    public List<Airline> testDatabaseConnection() {
        return Airline.find.findList();
    }
}
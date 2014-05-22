import models.Airport;
import models.Flight;
import org.junit.Test;
import util.algorithm.KShortestPath;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import static org.fest.assertions.Assertions.assertThat;


public class AlgorithmTest {

    /**
     * This integration test uses Selenium to test the app with a browser
     */
    @Test
    public void test() {

        Airport source = Airport.find.where().eq("name", "Los Angeles").findUnique();
        Airport target = Airport.find.where().eq("name", "New York - JFK").findUnique();

        Calendar calendar = Calendar.getInstance();
        calendar.set(2014, 5, 27);
        Date date = calendar.getTime();
        System.out.println(date);

        List<Flight> flights = KShortestPath.kShortestFlights(source, target, 10, date);
        System.out.println(String.format("# flights: %d", flights.size()));
    }

}

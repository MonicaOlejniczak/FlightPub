import models.Airport;
import models.Flight;
import org.joda.time.DateTime;
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
    public void test() {

        DateTime departureTime = new DateTime(2014, 9, 23, 0, 0);
        DateTime arrivalTime = new DateTime(2014, 11, 2, 0, 0);

        Airport source = Airport.find.where().eq("name", "Sydney").findUnique();
        Airport target = Airport.find.where().eq("name", "Canberra").findUnique();
        int depth = 3;

        List<Flight> sourceFlights = Flight.find.where()
                .between("departureTime", departureTime, arrivalTime)
                .eq("source", source)
                .findList();

        for (Flight sourceFlight : sourceFlights) {
            for (int i = 0; i < depth; i++) {
                Airport destination = sourceFlight.destination;
                if (destination == target) {
                    // found a path!
                    break;
                }
            }
        }

        /*Calendar calendar = Calendar.getInstance();
        calendar.set(2014, 5, 27);
        Date date = calendar.getTime();
        System.out.println(date);

        List<Flight> flights = KShortestPath.kShortestFlights(source, target, 10, date);
        System.out.println(String.format("# flights: %d", flights.size()));*/
    }

    public void gen() {

    }

}

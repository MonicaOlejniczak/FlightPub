package util.algorithm;

import models.Airport;
import models.Flight;
import models.Itinerary;
import org.joda.time.DateTime;
import org.junit.Test;

import java.util.List;

import static org.junit.Assert.*;
import static play.test.Helpers.fakeApplication;
import static play.test.Helpers.running;

public class FlightFinderTest {

    private int currentIdNum;

    @Test
    public void basicTest() {
        running(fakeApplication(), new Runnable() {
            public void run() {
                int MAX_NUM_DAYS = 3;
                int MAX_RESULTS = 100;

                Airport source = Airport.find.where().eq("name", "Canberra").findUnique();
                Airport destination = Airport.find.where().eq("name", "Sydney").findUnique();

                DateTime start = new DateTime(2014, 9, 27, 0, 0, 0);
                DateTime end = new DateTime(2014, 9, 30, 0, 0, 0);

                int depth = 7;
                List<Itinerary> actualList = FlightFinder.findFlights(source, destination, start, end, depth);

                assertTrue(getListEquality(actualList));
            }
        });
    }

    private boolean getListEquality(List<Itinerary> actualList) {
        for(Itinerary i: actualList) {
            if(!getItineraryequality(i.flights)) {
                return false;
            }
        }
        return true;
    }

    private boolean getItineraryequality(List<Flight> flights) {
        for(Flight f: flights) {
            int[] expectedId = new int[] {
                    11791,
                    23515,
                    27440,
                    34415,
                    50047,
                    47455,
                    11791,
                    23515,
                    27440,
                    34415,
                    50047,
                    47455,
                    11791,
                    23515,
                    27440,
                    34415,
                    50047,
                    47455,
                    11791,
                    23515,
                    27440,
                    34415,
                    50047,
                    47455,
                    11791,
                    23515,
                    27440,
                    34415,
                    50047,
                    47455,
                    11791,
                    23515,
                    27440,
                    34415,
                    50047,
                    47455,
                    11791,
                    23515,
                    27440,
                    34415,
                    50047,
                    47455,
                    11791,
                    23515,
                    33560,
                    50047,
                    47455,
                    11791,
                    23515,
                    33560,
                    50047,
                    47455,
                    11791,
                    23515,
                    33560,
                    50047,
                    47455,
                    11791,
                    23515,
                    33560,
                    50047,
                    47455,
                    11791,
                    23515,
                    33560,
                    50047,
                    47455,
                    11791,
                    23515,
                    33560,
                    50047,
                    47455,
                    11791,
                    23515,
                    33560,
                    50047,
                    47455,
                    11791,
                    23515,
                    33560,
                    50047,
                    47455,
                    11791,
                    23515,
                    33560,
                    50047,
                    47455,
                    11791,
                    23515,
                    33560,
                    50047,
                    47455,
                    11791,
                    23515,
                    33560,
                    50047,
                    47455,
                    11791,
                    23515,
                    33560,
                    50047,
                    47455,
                    11791,
                    23515,
                    33560,
                    17412,
                    40461,
                    11791,
                    23515,
                    33560,
                    17412,
                    41332,
                    11791,
                    23515,
                    33560,
                    17412,
                    40461,
                    11791,
                    23515,
                    33560,
                    17412,
                    41332,
                    11791,
                    23515,
                    33560,
                    17412,
                    40461,
                    11791,
                    23515,
                    33560,
                    17412,
                    41332,
                    11791,
                    23515,
                    33560,
                    17412,
                    40461,
                    11791,
                    23515,
                    33560,
                    17412,
                    41332,
                    11791,
                    23515,
                    33560,
                    17412,
                    40461,
                    11791,
                    23515,
                    33560,
                    17412,
                    41332
            };
            if(f.id == expectedId[currentIdNum]) {
                currentIdNum++;
            }
            else {
                return false;
            }
        }
        return true;
    }
}
package controllers;

import edu.asu.emit.qyan.alg.model.Path;
import models.Airline;
import models.Airport;
import models.Flight;
import org.joda.time.DateTime;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import util.algorithm.KShortestPath;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

public class DataController extends Controller {

	public static Result flights() {
        List<Flight> flights = Flight.find.select("flightNumber").setMaxRows(10).findList();
//        Json..newObject();
//        JsArray result = new JsArray();
//        for (Flight flight : flights) {
//            HashMap<String, JsValue> map = new HashMap<>();
//            Seq<>
//            map.put("test", new JsString("WHAT"));
//            JsObject flightObj = new JsObject(map);
//            flightObj
//        }
        return ok(Json.toJson(flights));
	}

	public static Result selectedFlights() {
		List<Flight> flights = Flight.getFlights();
		return ok(Json.toJson(flights));
	}

	public static Result airlines() {
		List<Airline> airlines = Airline.find.findList();
		return ok(Json.toJson(airlines));
	}

    public static Result airports() {
        List<Airport> airports = Airport.find.findList();
        return ok(Json.toJson(airports));
    }

    public static Result test() {

        Airport source = Airport.find.where().eq("name", "Los Angeles").findUnique();
        Airport target = Airport.find.where().eq("name", "New York - JFK").findUnique();

        DateTime start = new DateTime().withDate(2014, 9, 23).withTime(0, 0, 0, 0);
        DateTime end = new DateTime().withDate(2014, 9, 23).withTime(23, 59, 59, 999);

        int k = 10;

        List<Path> flights = KShortestPath.kShortestFlights(source, target, k, start, end);
//        System.out.println(String.format("# flights: %d", flights.size()));

        return ok(flights.toString());
    }

}

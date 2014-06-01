package controllers;

import models.*;
import org.joda.time.DateTime;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import util.algorithm.FlightFinder;

import java.util.ArrayList;
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

        Airport source = Airport.find.where().eq("name", "Sydney").findUnique();
        Airport destination = Airport.find.where().eq("name", "Canberra").findUnique();

        DateTime start = new DateTime().withDate(2014, 9, 23).withTime(0, 0, 0, 0);
        DateTime end = new DateTime().withDate(2014, 9, 27).withTime(23, 59, 59, 999);

        int depth = 4;

        List<List<FlightEdge>> flightEdgesList = FlightFinder.findFlightEdges(source, destination, depth);
        System.out.println(String.format("Edges: %d", flightEdgesList.size()));
        for (List<FlightEdge> flightEdges : flightEdgesList) {
            System.out.println(flightEdges);
        }
        List<List<Flight>> flights = FlightFinder.findFlights(source, destination, start, end, flightEdgesList);
        System.out.println(String.format("Flights: %d", flights.size()));
        for (List<Flight> itinerary : flights) {
            System.out.println(itinerary);
        }
        return ok("yes");
    }

    public static Result genEdges() {
        FlightFinder.genEdges();
        return ok("done");
    }

}

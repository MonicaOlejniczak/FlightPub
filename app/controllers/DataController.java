package controllers;

import com.fasterxml.jackson.databind.node.ObjectNode;
import models.*;
import org.joda.time.DateTime;
import play.api.libs.json.JsArray;
import play.api.libs.json.JsObject;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import util.algorithm.FlightFinder;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
		Airport source = Airport.find.where().eq("name", "Sydney").findUnique();
		Airport destination = Airport.find.where().eq("name", "Canberra").findUnique();

		DateTime start = new DateTime().withDate(2014, 9, 23).withTime(0, 0, 0, 0);
		DateTime end = new DateTime().withDate(2014, 9, 27).withTime(23, 59, 59, 999);

		int depth = 4;

		List<List<Flight>> flights = FlightFinder.findFlights(source, destination, start, end, depth);

        // generate limited version
        List<Map<String, List<Map<String, Object>>>> jItineraries = new ArrayList<>();
        for (List<Flight> itinerary : flights) {
            Map<String, List<Map<String, Object>>> jItinerary = new HashMap<>();

            List<Map<String, Object>> jFlights = new ArrayList<>();
            for (Flight flight : itinerary) {
                Map<String, Object> jFlight = new HashMap<>();
                jFlight.put("flightNumber", flight.flightNumber);
                jFlights.add(jFlight);
            }
            jItinerary.put("flights", jFlights);

            jItineraries.add(jItinerary);
        }
        System.out.println(jItineraries);
        return ok(Json.toJson(jItineraries));
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

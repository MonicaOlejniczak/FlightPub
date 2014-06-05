package controllers;

import models.*;
import org.joda.time.DateTime;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import util.algorithm.FlightFinder;

import java.util.*;

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
		Airport source = Airport.find.where().eq("name", request().getQueryString("source")).findUnique();
		Airport destination = Airport.find.where().eq("name", request().getQueryString("destination")).findUnique();

		DateTime start = new DateTime().withDate(2014, 9, 23).withTime(0, 0, 0, 0);
		DateTime end = new DateTime().withDate(2014, 9, 27).withTime(23, 59, 59, 999);

		int depth = 10;

		List<List<Flight>> flights = FlightFinder.findFlights(source, destination, start, end, depth);

        // generate limited version
        // NOTE: THIS IS GREAT HAHA /WRISTS
        int id = 0;
        List<Map<String, Object>> jItineraries = new ArrayList<>();
        for (List<Flight> itinerary : flights) {
            Map<String, Object> jItinerary = new HashMap<>();

            List<Map<String, Object>> jFlights = new ArrayList<>();

            long jDepartureTime = itinerary.get(0).departureTime.getMillis();
            long jArrivalTime = itinerary.get(itinerary.size() - 1).arrivalTime.getMillis();
            double jDuration = (jArrivalTime - jDepartureTime) / 60000.0;
            double jStopOvers = itinerary.size() - 1;
            double jItineraryPrice = 0;

            for (Flight flight : itinerary) {
                Map<String, Object> jFlight = new HashMap<>();
                jFlight.put("id", flight.id);
                jFlight.put("flightNumber", flight.flightNumber);
                jFlight.put("duration", flight.duration);
                jFlight.put("departureTime", flight.departureTime.getMillis());
                jFlight.put("arrivalTime", flight.arrivalTime.getMillis());

                Map<String, Object> jSource = new HashMap<>();
                jSource.put("name", flight.source.name);
                jFlight.put("source", jSource);

                Map<String, Object> jDestination = new HashMap<>();
                jDestination.put("name", flight.destination.name);
                jFlight.put("destination", jDestination);

                Map<String, Object> jAirline = new HashMap<>();
                jAirline.put("name", flight.airline.name);
                jFlight.put("airline", jAirline);

                Map<String, Object> jPrice = new HashMap<>();
                jPrice.put("price", new Random().nextInt(50));
                jFlight.put("price", jPrice);
                jItineraryPrice += new Random().nextInt(50);

                jFlights.add(jFlight);
            }
            jItinerary.put("id", id++);
            jItinerary.put("flights", jFlights);
            jItinerary.put("price", jItineraryPrice);
            jItinerary.put("duration", jDuration);
            jItinerary.put("stopOvers", jStopOvers);
            jItinerary.put("departureTime", jDepartureTime);
            jItinerary.put("arrivalTime", jArrivalTime);

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

	public static Result accountDetails() {
		Map<String, Object> details = new HashMap<>();
		User user = User.find.where().eq("email", session().get("email")).findUnique();
		details.put("firstName", user.firstName);
		details.put("lastName", user.lastName);
		details.put("email", user.email);
		return ok(Json.toJson(details));
	}

}

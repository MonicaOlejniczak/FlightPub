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
        String sourceName = request().getQueryString("source");
        String destinationName = request().getQueryString("destination");
        Long departing = Long.parseLong(request().getQueryString("departing"));
//        Long returning = Long.parseLong(request().getQueryString("returning"));

        int MAX_NUM_DAYS = 3;

		Airport source = Airport.find.where().eq("name", sourceName).findUnique();
		Airport destination = Airport.find.where().eq("name", destinationName).findUnique();

		DateTime start = new DateTime(departing).withTime(0, 0, 0, 0);
		DateTime end = new DateTime(departing).plusDays(MAX_NUM_DAYS).withTime(23, 59, 59, 999);

        System.out.println(start);
        System.out.println(end);

		int depth = 7;

		List<Itinerary> flights = FlightFinder.findFlights(source, destination, start, end, depth);
        flights.sort(new Comparator<Itinerary>() {
            @Override
            public int compare(Itinerary o1, Itinerary o2) {
                return Integer.compare(o1.flights.size(), o2.flights.size());
            }
        });
        flights = flights.subList(0, Math.min(flights.size(), 100));

        // generate limited version
        // NOTE: THIS IS GREAT HAHA /WRISTS
        // TODO: use http://wiki.fasterxml.com/JacksonJsonViews
        int id = 0;
        List<Map<String, Object>> jItineraries = new ArrayList<>();
        for (Itinerary itinerary : flights) {
            Map<String, Object> jItinerary = new HashMap<>();

            List<Map<String, Object>> jFlights = new ArrayList<>();

            long jDepartureTime = itinerary.flights.get(0).departureTime.getMillis();
            long jArrivalTime = itinerary.flights.get(itinerary.flights.size() - 1).arrivalTime.getMillis();
            double jDuration = jArrivalTime - jDepartureTime;
            double jStopOvers = itinerary.flights.size() - 1;
            double jItineraryPrice = 0;

            for (Flight flight : itinerary.flights) {
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
	            jDestination.put("code", flight.destination.code);
                jFlight.put("destination", jDestination);

                Map<String, Object> jAirline = new HashMap<>();
                jAirline.put("name", flight.airline.name);
                jFlight.put("airline", jAirline);

	            double price = flight.getPrice().price; //new Random().nextInt(50); // TODO
                Map<String, Object> jPrice = new HashMap<>();
                jPrice.put("price", price);
                jFlight.put("price", jPrice);
                jItineraryPrice += price;

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
		details.put("phoneNumber", user.phoneNumber);
		details.put("address", user.streetAddress);
		details.put("suburb", user.suburb);
		//todo details.put("country", user.country);
		details.put("state", user.state);
		details.put("postcode", user.postcode);
		if (user.lastPayment != null) {
			details.put("paymentMethod", user.lastPayment.paymentMethod);
			details.put("cardName", user.lastPayment.cardName);
			details.put("cardNumber", user.lastPayment.cardNumber);
			details.put("ppUsername", user.lastPayment.ppUsername);
		}
		return ok(Json.toJson(details));
	}

}

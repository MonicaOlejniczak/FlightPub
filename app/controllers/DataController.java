package controllers;

import models.*;
import org.joda.time.DateTime;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;

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
        DateTime end = new DateTime().withDate(2014, 10, 23).withTime(23, 59, 59, 999);

        int depth = 1;

        List<List<Flight>> flights = findFlights(source, destination, start, end, depth);

        //int k = 10;

//        List<Path> flights = KShortestPath.kShortestFlights(source, target, k, start, end);
//        System.out.println(String.format("# flights: %d", flights.size()));

        //return ok(flights.toString());
        return ok(Json.toJson(flights));
    }

    private static List<List<Flight>> findFlights(Airport source, Airport destination, DateTime start, DateTime end, int depth) {
        List<List<Flight>> flights = new ArrayList<>();
        List<Flight> flightList = Flight.find.where().between("departureTime", start, end).findList();
//        List<FlightEdge> edgeList = FlightEdge.find.all();
        //List<Flight> sourceFlights = Flight.find.where().between("departureTime", start, end).eq("source", source).findList();

        List<Flight> path = new ArrayList<>();
        findFlights(source, destination, path, flightList, flights, depth);

        /*for (Flight sourceFlight : sourceFlights) {

        }*/
        return flights;
    }

    private static void findFlights(Airport currentAirport, Airport destination, List<Flight> path, List<Flight> flightList, List<List<Flight>> flights, int depth) {
        if (depth < 0) {
            // already been here or too deep
            return;
        }
        for (Flight pathFlight : path) {
            if (pathFlight.source.equals(currentAirport)) {
                return;
            }
        }
        for (Flight flight : flightList) {
            if (flight.source.equals(currentAirport) && (path.size() == 0 || flight.departureTime.isAfter(path.get(path.size() - 1).arrivalTime))) {
                path.add(flight);
//                System.out.println(String.format("Exploring %s at depth %d", path, depth));
                // do things
                if (flight.destination.equals(destination)) {
                    // valid flight!
                    System.out.println("Path Found!");
                    System.out.println(path);
                    flights.add(new ArrayList<>(path));
                } else {
                    // go deeper... much deeper
//                    System.out.println("attempting deeper");
                    findFlights(flight.destination, destination, path, flightList, flights, depth - 1);
                }
                path.remove(flight);
            }
        }
    }


    public static Result genEdges() {
        List<Airport> airports = Airport.find.all();
        for (Airport source : airports) {
            for (Airport destination : airports) {
                if (source == destination) {
                    // not a real flight
                    continue;
                }
                Flight flight = Flight.find.where().eq("source", source).eq("destination", destination).setMaxRows(1).findUnique();
                if (flight != null) {
                    System.out.println(String.format("There is a direct flight between %s -> %s", source, destination));
                    FlightEdge flightEdge = new FlightEdge(source, destination);
                    flightEdge.save();
                }
            }
        }
//        CombinationIterator it = new CombinationIterator(airports, 2);
//        while (it.hasNext()) {
//            List<Airport> list = it.<Airport>next();
//            Airport source = list.get(0);
//            Airport destination = list.get(1);
//        }
        return ok("no");
    }

    public static Result genPaths() {
        List<Airport> airports = Airport.find.all();
        List<FlightEdge> flightEdges = FlightEdge.find.all();
        int depth = 3;
        /*for (Airport source : airports) {
            for (Airport destination : airports) {
                if (source == destination) {
                    // not a real flight
                    continue;
                }
                List<FlightEdge> path = findFlight(flightEdges, source, destination, depth);
                if ()

                List<Path> flights = KShortestPath.kShortestFlights(source, destination, 10, start, end);
            }
        }*/
        /*Graph graph = new Graph();
        for (Airport airport : airports) {
            graph.add_vertex(airport);
        }
        for (FlightEdge flightEdge : flightEdges) {
            graph.add_edge(flightEdge.source, flightEdge.destination, 1); // all have uniform weight
        }

        int k = 10;
        for (Airport source : airports) {
            for (Airport destination : airports) {
                //List<Path> flights = KShortestPath.kShortestFlights(source, destination, k, start, end);
//                List<Flight> flightList = Flight.find.where().between("departureTime", departureStart, departureEnd).findList();


                YenTopKShortestPathsAlg alg = new YenTopKShortestPathsAlg(graph);
                return alg.get_shortest_paths(source, destination, k);
            }
        }*/


        return ok("no");
    }

}

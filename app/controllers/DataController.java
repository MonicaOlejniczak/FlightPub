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
        DateTime end = new DateTime().withDate(2014, 9, 27).withTime(23, 59, 59, 999);

        int depth = 4;

        List<List<FlightEdge>> flightEdgesList = findFlightEdges(source, destination, depth);
        for (List<FlightEdge> flightEdges : flightEdgesList) {
            System.out.println(flightEdges);
        }
        List<List<Flight>> flights = findFlights(source, destination, start, end, flightEdgesList);
        for (List<Flight> itinerary : flights) {
            System.out.println(itinerary);
        }
//        List<Flight> flightList = Flight.find.where().between("departureTime", start, end).findList();
//
//        for (List<FlightEdge> flightEdge : flightEdges) {
//            for (Flight flight : flightList) {
//
//            }
//        }

        //int k = 10;

//        List<Path> flights = KShortestPath.kShortestFlights(source, target, k, start, end);
//        System.out.println(String.format("# flights: %d", flights.size()));

        //return ok(flights.toString());
        return ok("yes");
    }

    private static List<List<Flight>> findFlights(Airport source, Airport destination, DateTime start, DateTime end, List<List<FlightEdge>> flightEdgesList) {
        List<List<Flight>> flights = new ArrayList<>();
        List<Flight> possibleFlights = Flight.find.where().between("departureTime", start, end).findList();
        for (List<FlightEdge> flightEdges : flightEdgesList) {
            FlightEdge firstEdge = flightEdges.get(0);
            for (Flight possibleFlight : possibleFlights) {
                if (possibleFlight.source.equals(source) && possibleFlight.destination.equals(firstEdge.destination)) {
                    List<Flight> path = new ArrayList<>();
                    path.add(possibleFlight);
                    if (possibleFlight.destination.equals(destination)) {
                        // direct flight, yeaaah
                        flights.add(path);
                    } else {
                        // aww, find them the harder way
                        findFlights(destination, path, possibleFlights, flightEdges, flights, 1);
                    }
                }
            }
        }
        return flights;
    }

    private static void findFlights(Airport destination, List<Flight> path, List<Flight> possibleFlights, List<FlightEdge> flightEdges, List<List<Flight>> flights, int depth) {
        if (depth >= flightEdges.size()) {
            // seek no more!
            return;
        }
        FlightEdge flightEdge = flightEdges.get(depth);
        for (Flight flight : possibleFlights) {
            if (path.contains(flight)) {
                // move along
                continue;
            }
            path.add(flight);
            if (flight.departureTime.isAfter(path.get(path.size() - 2).arrivalTime)) {
                if (flight.source.equals(flightEdge.source) && flight.destination.equals(destination)) {
                    flights.add(new ArrayList<>(path));
                    // found a full path ^_^
                } else if (flight.source.equals(flightEdge.source) && flight.destination.equals(flightEdge.destination)) {
                    // linking flight!
                    findFlights(destination, path, possibleFlights, flightEdges, flights, depth + 1);
                }
            }
            path.remove(flight);
        }
    }

    private static List<List<FlightEdge>> findFlightEdges(Airport source, Airport destination, int depth) {
        List<List<FlightEdge>> flights = new ArrayList<>();
//        List<Flight> flightList = Flight.find.where().between("departureTime", start, end).findList();
        List<FlightEdge> edgeList = FlightEdge.find.all();
        //List<Flight> sourceFlights = Flight.find.where().between("departureTime", start, end).eq("source", source).findList();

        List<FlightEdge> path = new ArrayList<>();
        findFlightEdges(source, destination, path, edgeList, flights, depth);

        /*for (Flight sourceFlight : sourceFlights) {

        }*/
        return flights;
    }

    private static void findFlightEdges(Airport currentAirport, Airport destination, List<FlightEdge> path, List<FlightEdge> edgeList, List<List<FlightEdge>> flights, int depth) {
        if (depth < 0) {
            // too deep
            return;
        }
        for (FlightEdge flightEdge : path) {
            if (flightEdge.source.equals(currentAirport)) {
                // avoid cycles
                return;
            }
        }
        for (FlightEdge flightEdge : edgeList) {
            if (flightEdge.source.equals(currentAirport)) {
                path.add(flightEdge);
//                System.out.println(String.format("Exploring %s at depth %d", path, depth));
                // do things
                if (flightEdge.destination.equals(destination)) {
                    // valid flight!
                    flights.add(new ArrayList<>(path));
                } else {
                    // go deeper... much deeper
//                    System.out.println("attempting deeper");
                    findFlightEdges(flightEdge.destination, destination, path, edgeList, flights, depth - 1);
                }
                path.remove(flightEdge);
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

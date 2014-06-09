package util.algorithm;

import models.Airport;
import models.Flight;
import models.FlightEdge;
import models.Itinerary;
import org.joda.time.DateTime;

import java.util.ArrayList;
import java.util.List;

public class FlightFinder {
	public static final int DEFAULT_SEARCH_DEPTH = 4;

    public static List<Itinerary> findFlights(Airport source, Airport destination, DateTime start, DateTime end, int depth) {
        List<List<FlightEdge>> flightEdgesList = FlightFinder.findFlightEdges(source, destination, depth);
	    return findFlights(source, destination, start, end, flightEdgesList);
    }

    public static List<Itinerary> findFlights(Airport source, Airport destination, DateTime start, DateTime end, List<List<FlightEdge>> flightEdgesList) {

        List<Itinerary> flights = new ArrayList<>();
        List<Flight> possibleFlights = Flight.find.where().between("departureTime", start, end).findList();
        for (List<FlightEdge> flightEdges : flightEdgesList) {
            FlightEdge firstEdge = flightEdges.get(0);
            for (Flight possibleFlight : possibleFlights) {
                if (possibleFlight.source.equals(source) && possibleFlight.destination.equals(firstEdge.destination)) {
                    Itinerary itinerary = new Itinerary();
                    itinerary.flights.add(possibleFlight);
                    if (possibleFlight.destination.equals(destination)) {
                        // direct flight, yeaaah
                        flights.add(itinerary);
                    } else {
                        // aww, find them the harder way
                        findFlights(destination, itinerary, possibleFlights, flightEdges, flights, 1);
                    }
                }
            }
        }
        return flights;
    }

    private static void findFlights(Airport destination, Itinerary itinerary, List<Flight> possibleFlights, List<FlightEdge> flightEdges, List<Itinerary> flights, int depth) {
        if (depth >= flightEdges.size()) {
            // seek no more!
            return;
        }
        FlightEdge flightEdge = flightEdges.get(depth);
        for (Flight flight : possibleFlights) {
            if (itinerary.flights.contains(flight)) {
                // move along
                continue;
            }
            itinerary.flights.add(flight);
            if (flight.departureTime.isAfter(itinerary.flights.get(itinerary.flights.size() - 2).arrivalTime)) {
                if (flight.source.equals(flightEdge.source) && flight.destination.equals(destination)) {
                    flights.add(new Itinerary(itinerary));
                    // found a full path ^_^
                } else if (flight.source.equals(flightEdge.source) && flight.destination.equals(flightEdge.destination)) {
                    // linking flight!
                    findFlights(destination, itinerary, possibleFlights, flightEdges, flights, depth + 1);
                }
            }
            itinerary.flights.remove(flight);
        }
    }

    public static List<List<FlightEdge>> findFlightEdges(Airport source, Airport destination, int depth) {
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

    public static void genEdges() {
        List<Airport> airports = Airport.find.all();
        for (FlightEdge flightEdge : FlightEdge.find.all()) {
            flightEdge.delete();
        }
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
    }
}

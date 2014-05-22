package util.algorithm;

import com.avaje.ebean.Query;
import edu.asu.emit.qyan.alg.control.YenTopKShortestPathsAlg;
import edu.asu.emit.qyan.alg.model.Graph;
import edu.asu.emit.qyan.alg.model.Path;
import models.Airport;
import models.Flight;
import org.joda.time.DateTime;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class KShortestPath {
    public static List<Path> kShortestFlights (Airport source, Airport destination, int k, DateTime departureStart, DateTime departureEnd) {
        List<Flight> flightList = Flight.find.where().between("departureTime", departureStart, departureEnd).findList();

        Graph graph = new Graph();
        for (Flight flight : flightList) {
            graph.add_vertex(flight.source);
            graph.add_vertex(flight.destination);
            graph.add_edge(flight.source, flight.destination, flight.get_weight());
        }

        YenTopKShortestPathsAlg alg = new YenTopKShortestPathsAlg(graph);
        return alg.get_shortest_paths(source, destination, k);
    }
}

package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import models.*;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;

import java.util.*;

public class AdminController extends Controller {
    public static Result routes() {
        int page = Integer.parseInt(request().getQueryString("page"));
        int start = Integer.parseInt(request().getQueryString("start"));
        int limit = Integer.parseInt(request().getQueryString("limit"));

        Map<String, Object> result = new HashMap<>();
        List<Object> routes = new ArrayList<>();
        List<Flight> flights = Flight.find.findList();
        for (Flight flight : flights) {
            Map<String, Object> route = new HashMap<>();
            route.put("id", flight.id);
            route.put("airline", flight.airline);
            route.put("flightNumber", flight.flightNumber);
            route.put("source", flight.source);
            route.put("destination", flight.destination);
            route.put("departureTime", flight.departureTime.getMillis());
            route.put("arrivalTime", flight.arrivalTime.getMillis());
            route.put("plane", flight.plane);
            route.put("duration", flight.duration);
            route.put("price", Math.floor(Math.random() * 5000));
            routes.add(route);
        }
        routes = routes.subList(start, start + limit);
        int totalCount = flights.size();
        result.put("total", totalCount);
        result.put("routes", routes);

        return ok(Json.toJson(result));
    }

    public static Result deleteFlight() {
        JsonNode data = request().body().asJson();
        JsonNode flightId = data.get("flightId");
        Flight flight = Flight.find.byId(flightId.asLong());
        flight.delete(); // todo fix
        return ok();
    }
}

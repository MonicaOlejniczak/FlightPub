package controllers;

import models.Airport;
import models.Flight;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;

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


    public static Result airports() {
        List<Airport> airports = Airport.find.findList();
        return ok(Json.toJson(airports));
    }

}

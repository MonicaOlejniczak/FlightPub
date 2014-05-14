package controllers;

import models.Flight;
import play.mvc.Controller;
import play.mvc.Result;

import java.util.*;

public class HomeController extends Controller {

	public static Result login() {
		List<Flight> flights = Flight.find.all();
		return ok(views.html.home.render(flights));
	}

	public static Result processFlights() {
		// this is stupid </rage>
		/*RawSql rawSql = RawSqlBuilder
						.parse("SELECT * FROM Flight GROUP BY flightNumber")
						.columnMapping("flightNumber", "flightNumber")
						.create();
		List<Flight> flights = Flight.find.setRawSql(rawSql).findList();*/
		List<Integer> idList = new LinkedList<>();
		idList.addAll(Arrays.asList(1, 446, 872, 1311, 1752, 2193, 2626, 3065, 3941, 4380, 4806, 5243, 5668, 6110, 6552, 6994, 7417));
		List<Flight> flights = Flight.find.select("flightNumber").where().idIn(idList).findList();
		return ok(views.html.flights.render(flights));
	}

}

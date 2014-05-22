package models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import edu.asu.emit.qyan.alg.model.abstracts.BaseEdge;
import edu.asu.emit.qyan.alg.model.abstracts.BaseVertex;
import org.joda.time.DateTime;
import play.db.ebean.Model;
import play.data.format.Formats;
import play.data.validation.Constraints;

import javax.persistence.*;

import java.util.*;

@Entity
public class Flight extends Model implements BaseEdge {

	/**
	 * Uniquely identifies the flight
	 */
	@Id
	public Long id;

	/**
	 * Specifies the airline associated with the current flight
	 */
	@Constraints.Required
	@ManyToOne(cascade = CascadeType.ALL)
	public Airline airline;

	/**
	 * A standard six letter code to identify the flight
	 */
	@Constraints.Required
	@Constraints.MinLength(6)
	@Constraints.MaxLength(6)
	public String flightNumber;

	/**
	 * The source airport
	 */
	@Constraints.Required
    @ManyToOne(cascade = CascadeType.ALL)
    public Airport source;

	/**
	 * The stopover airport
	 */
	@Constraints.Required
    @ManyToOne(cascade = CascadeType.ALL)
	public Airport stopOver;

	/**
	 * The destination airport
	 */
	@Constraints.Required
    @ManyToOne(cascade = CascadeType.ALL)
	public Airport destination;

	/**
	 * Specifies the departure date and time
	 */
	@Constraints.Required
	@Formats.DateTime(pattern="yyyy-MM-dd HH:mm:ss")
	public DateTime departureTime;

	/**
	 * Specifies the stop over arrival date and time
	 */
	@Constraints.Required
	@Formats.DateTime(pattern="yyyy-MM-dd HH:mm:ss")
	public DateTime arrivalTimeStopOver;

	/**
	 * Specifies the stop over departure date and time
	 */
	@Constraints.Required
	@Formats.DateTime(pattern="yyyy-MM-dd HH:mm:ss")
	public DateTime departureTimeStopOver;

	/**
	 * Specifies the arrival date and time to the destination
	 */
	@Constraints.Required
	@Formats.DateTime(pattern="yyyy-MM-dd HH:mm:ss")
	public DateTime arrivalTime;

	/**
	 * The type of plane that will be boarded
	 */
	@Constraints.Required
	@ManyToOne(cascade = CascadeType.ALL)
	public Plane plane;

	/**
	 * Specifies the duration of the flight in minutes
	 */
	@Constraints.Required
	@Constraints.Min(0)
	@Constraints.Max(6000)
	@Constraints.MinLength(2)
	@Constraints.MaxLength(4)
	public Integer duration;

	/**
	 * Specifies the duration of the second leg in minutes
	 */
	@Constraints.Required
	@Constraints.Min(0)
	@Constraints.Max(6000)
	@Constraints.MinLength(2)
	@Constraints.MaxLength(4)
	public Integer durationSecondLeg;

	/**
	 * A reverse mapping of the list of seat availabilities for a particular flight
	 */
    @JsonIgnore
	@OneToMany(mappedBy = "flight", fetch = FetchType.LAZY)
	public List<Availability> availabilities = new ArrayList<>();

	/**
	 * A reverse mapping of the list of tickets made for a particular flight
	 */
    @JsonIgnore
	@OneToMany(mappedBy = "flight", fetch = FetchType.LAZY)
	public List<Ticket> tickets = new ArrayList<>();

	/**
	 * A reverse mapping of the list of messages between a user and travel agent for a particular flight
	 */
    @JsonIgnore
	@OneToMany(mappedBy = "flight", fetch = FetchType.LAZY)
	public List<Message> messages = new ArrayList<>();

	/**
	 * Class constructor setting the required variables of the class
	 */
	public Flight(Airline airline, String flightNumber, Airport source, Airport stopOver, Airport destination, DateTime departureTime, DateTime arrivalTimeStopOver, DateTime departureTimeStopOver, DateTime arrivalTime, Plane plane, int duration, int durationSecondLeg) {
		this.airline = airline;
		this.flightNumber = flightNumber;
		this.source = source;
		this.stopOver = stopOver;
		this.destination = destination;
		this.departureTime = departureTime;
		this.arrivalTimeStopOver = arrivalTimeStopOver;
		this.departureTimeStopOver = departureTimeStopOver;
		this.arrivalTime = arrivalTime;
		this.plane = plane;
		this.duration = duration;
		this.durationSecondLeg = durationSecondLeg;
	}

	/**
	 * An accessor method that returns a list of flights
	 * @return a list of flights for the Flight page
	 */
	public static List<Flight> getFlights() {
		// this is stupid </rage>
		/*RawSql rawSql = RawSqlBuilder
						.parse("SELECT * FROM Flight GROUP BY flightNumber")
						.columnMapping("flightNumber", "flightNumber")
						.create();
		List<Flight> flights = Flight.find.setRawSql(rawSql).findList();*/
		List<Integer> idList = new LinkedList<>();
		idList.addAll(Arrays.asList(1, 446, 872, 1311, 1752, 2193, 2626, 3065, 3941, 4380, 4806, 5243, 5668, 6110, 6552, 6994, 7417));
		return Flight.find.select("flightNumber").where().idIn(idList).findList();
	}

	/**
	 * An accessor method that returns the price of the flight using the start date and flight number
	 * @return the price of the flight
	 */
	public Price getPrice() {
		return Price.find.where().le("startDate", departureTime)
				.eq("flightNumber", flightNumber).orderBy("startDate").setMaxRows(1).findUnique();
	}

	/*
	/**
	 * An accessor method that returns the total duration of the flight
	 * @return the total duration of the flight
	 */
	/*public Integer getDuration() {
		return duration; //+ (durationSecondLeg == null ? 0 : durationSecondLeg);
	}*/

	/**
	 * Creates a finder for the Flight entity
	 */
	public static Finder<Long, Flight> find = new Finder<>(Long.class, Flight.class);

    @Override
    public int get_weight() {
        return durationSecondLeg != null ? duration + durationSecondLeg : duration;
    }

    @Override
    public BaseVertex get_start_vertex() {
        return source;
    }

    @Override
    public BaseVertex get_end_vertex() {
        return destination;
    }
}

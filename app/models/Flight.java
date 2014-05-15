package models;

import play.db.ebean.Model;
import play.data.format.Formats;
import play.data.validation.Constraints;

import javax.persistence.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
public class Flight extends Model {

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
	public Date departureTime;

	/**
	 * Specifies the stop over arrival date and time
	 */
	@Constraints.Required
	@Formats.DateTime(pattern="yyyy-MM-dd HH:mm:ss")
	public Date arrivalTimeStopOver;

	/**
	 * Specifies the stop over departure date and time
	 */
	@Constraints.Required
	@Formats.DateTime(pattern="yyyy-MM-dd HH:mm:ss")
	public Date departureTimeStopOver;

	/**
	 * Specifies the arrival date and time to the destination
	 */
	@Constraints.Required
	@Formats.DateTime(pattern="yyyy-MM-dd HH:mm:ss")
	public Date arrivalTime;

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
	@OneToMany(mappedBy = "flight", fetch = FetchType.LAZY)
	public List<Availability> availabilities = new ArrayList<>();

	/**
	 * A reverse mapping of the list of tickets made for a particular flight
	 */
	@OneToMany(mappedBy = "flight", fetch = FetchType.LAZY)
	public List<Ticket> tickets = new ArrayList<>();

	/**
	 * A reverse mapping of the list of messages between a user and travel agent for a particular flight
	 */
	@OneToMany(mappedBy = "flight", fetch = FetchType.LAZY)
	public List<Message> messages = new ArrayList<>();

	/**
	 * Class constructor setting the required variables of the class
	 */
	public Flight(Airline airline, String flightNumber, Airport source, Airport stopOver, Airport destination, Date departureTime, Date arrivalTimeStopOver, Date departureTimeStopOver, Date arrivalTime, Plane plane, int duration, int durationSecondLeg) {
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
	 * Creates a finder for the Flight entity
	 */
	public static Finder<Long, Flight> find = new Finder<>(Long.class, Flight.class);

}

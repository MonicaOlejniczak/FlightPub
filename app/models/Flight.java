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

	@Id
	public Long id;

	@Constraints.Required
	@ManyToOne(cascade = CascadeType.ALL)
	public Airline airline;

	@Constraints.Required
	@Constraints.MinLength(6)
	@Constraints.MaxLength(6)
	public String flightNumber;

	@Constraints.Required
	@Constraints.MinLength(3)
	@Constraints.MaxLength(3)
	public String departureCode;

	@Constraints.Required
	@Constraints.MinLength(3)
	@Constraints.MaxLength(3)
	public String stopOverCode;

	@Constraints.Required
	@Constraints.MinLength(3)
	@Constraints.MaxLength(3)
	public String destinationCode;

	@Constraints.Required
	@Formats.DateTime(pattern="yyyy-MM-dd HH:mm:ss")
	public Date departureTime;

	@Constraints.Required
	@Formats.DateTime(pattern="yyyy-MM-dd HH:mm:ss")
	public Date arrivalTimeStopOver;

	@Constraints.Required
	@Formats.DateTime(pattern="yyyy-MM-dd HH:mm:ss")
	public Date departureTimeStopOver;

	@Constraints.Required
	@Formats.DateTime(pattern="yyyy-MM-dd HH:mm:ss")
	public Date arrivalTime;

	@Constraints.Required
	@ManyToOne(cascade = CascadeType.ALL)
	public PlaneType planeType;

	@Constraints.Required
	@Constraints.Min(0)
	@Constraints.Max(6000)
	@Constraints.MinLength(2)
	@Constraints.MaxLength(4)
	public int duration;

	@Constraints.Required
	@Constraints.Min(0)
	@Constraints.Max(6000)
	@Constraints.MinLength(2)
	@Constraints.MaxLength(4)
	public int durationSecondLeg;

	@OneToMany(mappedBy = "flight", fetch = FetchType.LAZY)
	public List<Availability> availabilities = new ArrayList<>();

	@OneToMany(mappedBy = "flight", fetch = FetchType.LAZY)
	public List<BookingRequest> bookingRequests = new ArrayList<>();

	@OneToMany(mappedBy = "flight", fetch = FetchType.LAZY)
	public List<Message> messages = new ArrayList<>();

	@OneToMany(mappedBy = "flight", fetch = FetchType.LAZY)
	public List<Price> prices = new ArrayList<>();

	public Flight(Airline airline, String flightNumber, String departureCode, String stopOverCode, String destinationCode, Date departureTime, Date arrivalTimeStopOver, Date departureTimeStopOver, Date arrivalTime, PlaneType planeType, int duration, int durationSecondLeg) {
		this.airline = airline;
		this.flightNumber = flightNumber;
		this.departureCode = departureCode;
		this.stopOverCode = stopOverCode;
		this.destinationCode = destinationCode;
		this.departureTime = departureTime;
		this.arrivalTimeStopOver = arrivalTimeStopOver;
		this.departureTimeStopOver = departureTimeStopOver;
		this.arrivalTime = arrivalTime;
		this.planeType = planeType;
		this.duration = duration;
		this.durationSecondLeg = durationSecondLeg;
	}

	public static Finder<Long, Flight> find = new Finder<>(Long.class, Flight.class);

}

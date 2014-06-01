package models;

/*
 * Itinerary.java
 * Date created: 01/06/2014
 * Copyright 2014 Trey Brisbane
 */

import play.data.validation.Constraints;
import play.db.ebean.Model;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
 * A class that maps trips/journeys to lists of the Flights necessary to get from point A to point B.
 *
 * @author Trey Brisbane
 */
@Entity
public class Itinerary extends Model {
	/**
	 * The surrogate key for the Itinerary table (because a composite key would be stupid in this case).
	 */
	@Id
	public Long id;

	/**
	 * The List of Flights included in this Itinerary.
	 */
	@Constraints.Required(message = "No Flights Specified!")
	@ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	public List<Flight> flights;

	/**
	 * The List of Bookings this Itinerary is included in.
	 */
	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "itinerary")
	public List<Booking> bookings;

	/**
	 * The List of recommendations this Itinerary has been included in.
	 */
	@ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "recommendations")
	public List<Booking> recommendedIn;

	/**
	 * Instantiates an Itinerary with the specified List of Flights.
	 * @param flights The List of Flights to include in this Itinerary.
	 */
	public Itinerary(List<Flight> flights) {
		this.flights = flights;
		this.bookings = new ArrayList<>();
		this.recommendedIn = new ArrayList<>();
	}

	/**
	 * The static Finder object used by this Entity to access the database.
	 */
	public static Model.Finder<Long, Itinerary> find = new Model.Finder<>(Long.class, Itinerary.class);
}

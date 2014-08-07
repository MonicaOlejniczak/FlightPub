package models;

import play.db.ebean.Model;
import play.data.validation.Constraints;
import play.data.format.Formats;

import javax.persistence.*;

import java.util.Date;

@Entity
public class Price extends Model {

	/**
	 * Uniquely identifies the price of a flight
	 */
	@Id
	public Long id;

	/**
	 * Specifies the flight number (not a particular flight) associated with a particular price
     *
     * This is actually a range of specific flights
	 */
	@Constraints.Required
    @Constraints.MinLength(6)
    @Constraints.MaxLength(6)
	public String flightNumber;

	/**
	 * Specifies the airline associated with a particular price
	 */
	@Constraints.Required
	@ManyToOne(cascade = CascadeType.ALL)
	public Airline airline;

	/**
	 * Specifies the ticket class associated with a particular price
	 */
	@Constraints.Required
	@ManyToOne(cascade = CascadeType.ALL)
	public TicketClass ticketClass;

	/**
	 * Specifies the ticket type associated with a particular price
	 */
	@Constraints.Required
	@ManyToOne(cascade = CascadeType.ALL)
	public TicketType ticketType;

	/**
	 * The date that the specified price begins
	 */
	@Constraints.Required
	@Formats.DateTime(pattern="yyyy-MM-dd HH:mm:ss")
	public Date startDate;

	/**
	 * The date that the specified price ends
	 */
	@Constraints.Required
	@Formats.DateTime(pattern="yyyy-MM-dd HH:mm:ss")
	public Date endDate;

	/**
	 * Specifies the price of the flight
	 */
	@Constraints.Required
	public Double price;

	/**
	 * Specifies the price of the first leg
	 */
	@Constraints.Required
	public Double priceLeg1;

	/**
	 * Specifies the price of the second leg
	 */
	@Constraints.Required
	public Double priceLeg2;

	/**
	 * Class constructor setting the required variables of the class
	 */
	public Price(String flightNumber, Airline airline, TicketClass ticketClass, TicketType ticketType, Date startDate, Date endDate, double price, double priceLeg1, double priceLeg2) {
		this.flightNumber = flightNumber;
		this.airline = airline;
		this.ticketClass = ticketClass;
		this.ticketType = ticketType;
		this.startDate = startDate;
		this.endDate = endDate;
		this.price = price;
		this.priceLeg1 = priceLeg1;
		this.priceLeg2 = priceLeg2;
	}

	/**
	 * Creates a finder for the Price entity
	 */
	public static Model.Finder<Long, Price> find = new Model.Finder<>(Long.class, Price.class);

}

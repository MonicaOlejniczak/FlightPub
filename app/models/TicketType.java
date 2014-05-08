package models;

import play.db.ebean.Model;
import play.data.validation.Constraints;

import javax.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class TicketType extends Model {

	/**
	 * Uniquely identifies the type of ticket
	 */
	@Id
	public Long id;

	/**
	 * A standard code for the ticket type beginning with 'A', 'B', ..., etc
	 */
	@Constraints.Required
	@Constraints.MinLength(1)
	@Constraints.MaxLength(1)
	public String code;

	/**
	 * Specifies the name of the type of ticket
	 */
	@Constraints.Required
	@Constraints.MinLength(2)
	@Constraints.MaxLength(6)
	public String name;

	/**
	 * Specifies whether the type of ticket is transferrable
	 */
	@Constraints.Required
	public boolean transferrable;

	/**
	 * Specifies whether the type of ticket is refundable
	 */
	@Constraints.Required
	public boolean refundable;

	/**
	 * Specifies whether the type of ticket is exchangeable
	 */
	@Constraints.Required
	public boolean exchangeable;

	/**
	 * Specifies the flyer points associated with the ticket type
	 */
	@Constraints.Required
	public boolean frequentFlyerPoints;

	/**
	 * A reverse mapping of the list of seat availabilities for a particular ticket type
	 */
	@OneToMany(mappedBy = "ticketType", fetch = FetchType.LAZY)
	public List<Availability> availabilities = new ArrayList<>();

	/**
	 * A reverse mapping of the list of prices for a particular ticket type
	 */
	@OneToMany(mappedBy = "ticketType", fetch = FetchType.LAZY)
	public List<Price> prices = new ArrayList<>();

	/**
	 * A reverse mapping of the list of tickets for a particular ticket type
	 */
	@OneToMany(mappedBy = "ticketType", fetch = FetchType.LAZY)
	public List<Ticket> tickets = new ArrayList<>();

	/**
	 * Class constructor setting the required variables of the class
	 */
	public TicketType(String code, String name, boolean transferrable, boolean refundable, boolean exchangeable, boolean frequentFlyerPoints) {
		this.code = code;
		this.name = name;
		this.transferrable = transferrable;
		this.refundable = refundable;
		this.exchangeable = exchangeable;
		this.frequentFlyerPoints = frequentFlyerPoints;
	}

	/**
	 * Creates a finder for the TicketType entity
	 */
	public static Model.Finder<Long, TicketType> find = new Model.Finder<>(Long.class, TicketType.class);

}

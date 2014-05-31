package models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import play.db.ebean.Model;
import play.data.validation.Constraints;

import javax.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class TicketClass extends Model {

	/**
	 * Uniquely identifies the ticket class
	 */
	@Id
	public Long id;

	/**
	 * A standard three letter code for the ticket class
	 */
	@Constraints.Required
	@Constraints.MinLength(3)
	@Constraints.MaxLength(3)
	public String code;

	/**
	 * The written equivalent of the ticket class code
	 */
	@Constraints.Required
	@Constraints.MinLength(3)
	@Constraints.MaxLength(30)
	public String details;

	/**
	 * A reverse mapping of the list of prices for a particular ticket class
	 */
    @JsonIgnore
	@OneToMany(mappedBy = "ticketClass", fetch = FetchType.LAZY)
	public List<Price> prices = new ArrayList<>();

	/**
	 * A reverse mapping of the list of tickets for a particular ticket class
	 */
    @JsonIgnore
	@OneToMany(mappedBy = "ticketClass", fetch = FetchType.LAZY)
	public List<Ticket> tickets = new ArrayList<>();

	/**
	 * Class constructor setting the required variables of the class
	 */
	public TicketClass(String details, String code) {
		this.details = details;
		this.code = code;
	}

	/**
	 * Creates a finder for the TicketClass entity
	 */
	public static Model.Finder<Long, TicketClass> find = new Model.Finder<>(Long.class, TicketClass.class);

}

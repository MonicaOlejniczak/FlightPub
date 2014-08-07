package models;

import play.db.ebean.Model;
import play.data.validation.Constraints;

import javax.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class PassengerType extends Model {

	/**
	 * An enumeration defining the type of passenger
	 */
	public enum TypeOfPassenger {
		ADULT,
		CHILD,
		INFANT
	}

	/**
	 * Uniquely identifies the type of passenger
	 */
	@Id
	public Long id;

	/**
	 * Specifies the type of passenger
	 */
	@Enumerated(EnumType.ORDINAL)
	@Constraints.Required
	public TypeOfPassenger typeOfPassenger;

	/**
	 * A reverse mapping of the list of tickets for a certain passenger type
	 */
	@OneToMany(mappedBy = "ticketClass", fetch = FetchType.LAZY)
	public List<Ticket> tickets = new ArrayList<>();

	/**
	 * Class constructor setting the required variables of the class
	 */
	public PassengerType(TypeOfPassenger typeOfPassenger) {
		this.typeOfPassenger = typeOfPassenger;
	}

	/**
	 * Creates a finder for the PassengerType entity
	 */
	public static Model.Finder<Long, PassengerType> find = new Model.Finder<>(Long.class, PassengerType.class);

}

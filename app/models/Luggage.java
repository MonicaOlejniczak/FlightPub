package models;

import play.db.ebean.Model;
import play.data.validation.Constraints;

import javax.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Luggage extends Model {

	/**
	 * An enumeration defining the type of luggage taken on a flight
	 */
	public enum LuggageType {
		CARRY_ON,
		CHECKED
	}

	/**
	 * Uniquely identifies the luggage
	 */
	@Id
	public Long id;

	/**
	 * the type of luggage being taken on board
	 */
    @Enumerated(EnumType.ORDINAL)
    @Constraints.Required
	public LuggageType luggageType;

	/**
	 * The weight of the luggage measured in kg
	 */
	@Constraints.Required
	@Constraints.Min(0)
	@Constraints.MinLength(0)
	@Constraints.MaxLength(10)
	public double weight;

	/**
	 * A reverse mapping of the list of tickets for a particular luggage
	 */
	@OneToMany(mappedBy = "ticketClass", fetch = FetchType.LAZY)
	public List<Ticket> tickets = new ArrayList<>();

	/**
	 * Class constructor setting the required variables of the class
	 */
	public Luggage(LuggageType luggageType, double weight) {
		this.luggageType = luggageType;
		this.weight = weight;
	}

	/**
	 * Creates a finder for the Luggage entity
	 */
	public static Model.Finder<Long, Luggage> find = new Model.Finder<>(Long.class, Luggage.class);

    public static LuggageType getLuggageType(String luggageType) {
        switch (luggageType) {
            case "CARRY_ON":
                return LuggageType.CARRY_ON;
            case "CHECKED":
                return LuggageType.CHECKED;
            default:
                throw new RuntimeException("Bad luggage type");
        }
    }

}

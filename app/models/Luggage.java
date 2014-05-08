package models;

import play.db.ebean.Model;
import play.data.validation.Constraints;

import javax.persistence.*;

@Entity
public class Luggage extends Model {

	public enum LuggageType {
		CARRY_ON,
		CHECKED
	}

	@Id
	public Long id;

    @Enumerated(EnumType.ORDINAL)
    @Constraints.Required
	public LuggageType luggageType;

	// measured in kg
	@Constraints.Required
	@Constraints.Min(0)
	@Constraints.MinLength(0)
	@Constraints.MaxLength(10)
	public double weight;

	public Luggage(LuggageType luggageType, double weight) {
		this.luggageType = luggageType;
		this.weight = weight;
	}

	public static Model.Finder<Long, Luggage> find = new Model.Finder<>(Long.class, Luggage.class);

}

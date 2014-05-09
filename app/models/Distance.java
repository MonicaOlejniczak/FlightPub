package models;

import play.db.ebean.Model;
import play.data.validation.Constraints;

import javax.persistence.*;

@Entity
public class Distance extends Model {

	/**
	 * Uniquely identifies the distance of the source and destination airports
	 */
	@Id
	public Long id;

	/**
	 * Specifies the source airport
	 */
	@Constraints.Required
	@ManyToOne(cascade = CascadeType.ALL)
	public Airport source;

	/**
	 * Specifies the destination airport
	 */
	@Constraints.Required
	@ManyToOne(cascade = CascadeType.ALL)
	public Airport destination;

	/**
	 * The distance between the two airports in km
	 */
	@Constraints.Required
	@Constraints.Min(0)
	@Constraints.MinLength(1)
	@Constraints.MaxLength(6)
	public int distance;

	/**
	 * Class constructor setting the required variables of the class
	 */
	public Distance(Airport source, Airport destination, int distance) {
		this.source = source;
		this.destination = destination;
		this.distance = distance;
	}

	/**
	 * Creates a finder for the Distance entity
	 */
	public static Model.Finder<Long, Distance> find = new Model.Finder<>(Long.class, Distance.class);

}

package models;

import play.db.ebean.Model;
import play.data.format.Formats;
import play.data.validation.Constraints;

import javax.persistence.*;

import java.util.Date;

@Entity
public class FlightSearch extends Model {

	/**
	 * Uniquely identifies the flight search
	 */
	@Id
	public Long id;

	/**
	 * Specifies the user that made the search
	 */
	@Constraints.Required
	@ManyToOne(cascade = CascadeType.ALL)
	public User user;

	/**
	 * Stores the search term made by the user
	 */
	@Constraints.Required
	public String searchTerm;

	/**
	 * The date the search was made
	 */
	@Constraints.Required
	@Formats.DateTime(pattern="yyyy-MM-dd HH:mm:ss")
	public Date date;

	/**
	 * Class constructor setting the required variables of the class
	 */
	public FlightSearch(User user, String searchTerm) {
		this.user = user;
		this.searchTerm = searchTerm;
		this.date = new Date();
	}

	/**
	 * Creates a finder for the FlightSearch entity
	 */
	public static Model.Finder<Long, FlightSearch> find = new Model.Finder<>(Long.class, FlightSearch.class);

}

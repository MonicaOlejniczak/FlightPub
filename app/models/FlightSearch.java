package models;

import play.db.ebean.Model;
import play.data.format.Formats;
import play.data.validation.Constraints;

import javax.persistence.*;

import java.util.Date;

@Entity
public class FlightSearch extends Model {

	@Id
	public Long id;

	@Constraints.Required
	@ManyToOne(cascade = CascadeType.ALL)
	public User user;

	@Constraints.Required
	public String searchTerm;

	@Constraints.Required
	@Formats.DateTime(pattern="yyyy-MM-dd HH:mm:ss")
	public Date date;

	public FlightSearch(User user, String searchTerm) {
		this.user = user;
		this.searchTerm = searchTerm;
		this.date = new Date();
	}

	public static Model.Finder<Long, FlightSearch> find = new Model.Finder<>(Long.class, FlightSearch.class);

}

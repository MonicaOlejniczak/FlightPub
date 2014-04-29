package models;

import play.db.ebean.Model;
import play.data.validation.Constraints;

import javax.persistence.*;

@Entity
public class Distance extends Model {

	@Id
	public Long id;

	@Constraints.Required
	@ManyToOne(cascade = CascadeType.ALL)
	public Airport source;

	@Constraints.Required
	@ManyToOne(cascade = CascadeType.ALL)
	public Airport destination;

	@Constraints.Required
	@Constraints.Min(0)
	@Constraints.MinLength(1)
	@Constraints.MaxLength(6)
	public int distance;

	public Distance(Airport source, Airport destination, int distance) {
		this.source = source;
		this.destination = destination;
		this.distance = distance;
	}

	public static Model.Finder<Long, Distance> find = new Model.Finder<>(Long.class, Distance.class);

}

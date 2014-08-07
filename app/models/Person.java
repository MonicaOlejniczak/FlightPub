package models;

import play.data.validation.Constraints;
import play.db.ebean.Model;

import javax.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Person extends Model {

	/**
	 * Uniquely identifies the person
	 */
	@Id
	public Long id;

	/**
	 * Specifies a person's first name
	 */
	@Constraints.Required
	@Constraints.MinLength(1)
	@Constraints.MaxLength(30)
	public String firstName;

	/**
	 * Specifies a person's last name
	 */
	@Constraints.Required
	@Constraints.MinLength(1)
	@Constraints.MaxLength(30)
	public String lastName;

	/**
	 * A reverse mapping of the list of tickets for a particular person
	 */
	@OneToMany(mappedBy = "person", fetch = FetchType.LAZY)
	public List<Ticket> tickets = new ArrayList<>();

	/**
	 * Class constructor setting the required variables of the class
	 */
	public Person(String firstName, String lastName) {
		this.firstName = firstName;
		this.lastName = lastName;
	}

	/**
	 * Creates a finder for the Person entity
	 */
	public static Model.Finder<Long, Person> find = new Model.Finder<>(Long.class, Person.class);

}

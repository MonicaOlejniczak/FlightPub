package models;

import play.data.validation.Constraints;
import play.db.ebean.Model;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToMany;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Role extends Model {

	/**
	 * Uniquely identifies the user role
	 */
	@Id
	public Long id;

	/**
	 * Specifies the name of the role
	 */
	@Constraints.Required
	public String name;

	/**
	 * A reverse mapping of the list of users for a particular role
	 * A user may have multiple roles
	 */
	@ManyToMany(cascade = CascadeType.ALL)
	public List<User> users = new ArrayList<>();

	/**
	 * Class constructor setting the required variables of the class
	 */
	public Role(String name) {
		this.name = name;
	}

	/**
	 * Creates a finder for the Role entity
	 */
	public static Model.Finder<Long, Role> find = new Model.Finder<>(Long.class, Role.class);

}

package models;

import play.data.validation.Constraints;
import play.db.ebean.Model;

import javax.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Timezone extends Model {

	/**
	 * Uniquely identifies the timezone
	 */
	@Id
	public Long id;

	/**
	 * Specifies the name of the timezone
	 */
	@Constraints.Required
	public String name;

	/**
	 * The offset of the timezone between -12:00 and 13:00
	 */
	@Constraints.Required
	@Constraints.Min(-12)
	@Constraints.Max(13)
	@Constraints.MinLength(2)
	@Constraints.MaxLength(2)
	public Float offset;

	/**
	 * Class constructor setting the required variables of the class
	 */
	public Timezone(String name, Float offset) {
		this.name = name;
		this.offset = offset;
	}

	/**
	 * Creates a finder for the Timezone entity
	 */
	public static Model.Finder<Long, Timezone> find = new Model.Finder<>(Long.class, Timezone.class);

}

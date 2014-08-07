package models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import play.db.ebean.Model;
import play.data.validation.Constraints;

import javax.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Plane extends Model {

	/**
	 * Uniquely identifies the plane
	 */
	@Id
	public Long id;

	/**
	 * A standard code for the plane
	 */
	@Constraints.Required
	@Constraints.MaxLength(10)
	public String code;

	/**
	 * The description of the type of plane
	 */
	@Constraints.Required
	@Constraints.MinLength(3)
	@Constraints.MaxLength(30)
	public String details;

	/**
	 * Specifies the amount in first class
	 */
	@Constraints.Required
	@Constraints.Min(0)
	@Constraints.MinLength(1)
	@Constraints.MaxLength(4)
	public int firstClassAmount;

	/**
	 * Specifies the amount in business class
	 */
	@Constraints.Required
	@Constraints.Min(0)
	@Constraints.MinLength(1)
	@Constraints.MaxLength(4)
	public int businessClassAmount;

	/**
	 * Specifies the amount in premium economy class
	 */
	@Constraints.Required
	@Constraints.Min(0)
	@Constraints.MinLength(1)
	@Constraints.MaxLength(4)
	public int premiumEconomyClassAmount;

	/**
	 * Specifies the amount in economy class
	 */
	@Constraints.Required
	@Constraints.Min(0)
	@Constraints.MinLength(1)
	@Constraints.MaxLength(4)
	public int economyClassAmount;

	/**
	 * A reverse mapping of the list of flights for a particular plane type
	 */
    @JsonIgnore
	@OneToMany(mappedBy = "plane", fetch = FetchType.LAZY)
	public List<Flight> flights = new ArrayList<>();

	/**
	 * Class constructor setting the required variables of the class
	 */
	public Plane(String code, String details, int firstClassAmount, int businessClassAmount, int premiumEconomyClassAmount, int economyClassAmount) {
		this.code = code;
		this.details = details;
		this.firstClassAmount = firstClassAmount;
		this.businessClassAmount = businessClassAmount;
		this.premiumEconomyClassAmount = premiumEconomyClassAmount;
		this.economyClassAmount = economyClassAmount;
	}

	/**
	 * Creates a finder for the PlaneType entity
	 */
	public static Model.Finder<Long, Plane> find = new Model.Finder<>(Long.class, Plane.class);

}

package models;

import play.db.ebean.Model;
import play.data.validation.Constraints;

import javax.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class TicketType extends Model {

	@Id
	public Long id;

	@Constraints.Required
	@Constraints.MinLength(1)
	@Constraints.MaxLength(1)
	public String code;

	@Constraints.Required
	@Constraints.MinLength(2)
	@Constraints.MaxLength(6)
	public String name;

	@Constraints.Required
	public boolean transferrable;

	@Constraints.Required
	public boolean refundable;

	@Constraints.Required
	public boolean exchangeable;

	@Constraints.Required
	public boolean frequentFlyerPoints;

	@OneToMany(mappedBy = "ticketType", fetch = FetchType.LAZY)
	public List<Availability> availabilities = new ArrayList<>();

	@OneToMany(mappedBy = "ticketType", fetch = FetchType.LAZY)
	public List<Price> prices = new ArrayList<>();

	public TicketType(String code, String name, boolean transferrable, boolean refundable, boolean exchangeable, boolean frequentFlyerPoints) {
		this.code = code;
		this.name = name;
		this.transferrable = transferrable;
		this.refundable = refundable;
		this.exchangeable = exchangeable;
		this.frequentFlyerPoints = frequentFlyerPoints;
	}

	public static Model.Finder<Long, TicketType> find = new Model.Finder<>(Long.class, TicketType.class);

}

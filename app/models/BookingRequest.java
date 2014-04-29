package models;

import play.db.ebean.Model;
import play.data.format.Formats;
import play.data.validation.Constraints;

import javax.persistence.*;

import java.util.Date;

@Entity
public class BookingRequest extends Model {

	public enum Status {
		PENDING,
		APPROVED,
		DECLINED
	}

	@Id
	public Long id;

	@Constraints.Required
	@ManyToOne(cascade = CascadeType.ALL)
	public Flight flight;

	@Constraints.Required
	@ManyToOne(cascade = CascadeType.ALL)
	public User user;

	@Constraints.Required
	@Formats.DateTime(pattern="yyyy-MM-dd HH:mm:ss")
	public Date date;

	@Constraints.Required
	public Status status;

	@Constraints.Required
	@Formats.DateTime(pattern="yyyy-MM-dd HH:mm:ss")
	public Date lastStatusUpdateDate;

	@Constraints.Required
	public User lastUpdatedBy;

	@OneToOne(mappedBy = "bookingRequest", fetch = FetchType.LAZY)
	public Booking booking = new Booking();

	//TODO constructor, any reverse mappings

	public static Model.Finder<Long, BookingRequest> find = new Model.Finder<>(Long.class, BookingRequest.class);

}

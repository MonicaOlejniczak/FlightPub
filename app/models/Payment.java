package models;

import play.data.validation.Constraints;
import play.db.ebean.Model;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Payment extends Model{
    /**
     * Uniquely identifies the booking
     */
    @Id
    public Long id;

	/**
	 *
	 */
	@ManyToOne(cascade = CascadeType.ALL)
	public String paymentMethod;

	/**
	 * A reverse mapping of the list of bookings for a particular payment
	 */
	@Constraints.Required
	@OneToMany(mappedBy = "payment", fetch = FetchType.LAZY)
	public List<Booking> bookings = new ArrayList<>();

	/**
	 * Default constructor
	 */
	public Payment() {

	}

    /**
     * Class constructor setting the required variables of the class
     *
	 * @param cardName the card name
	 */
    public Payment(String paymentMethod) {
	    this.paymentMethod = paymentMethod;
    }

    /**
     * Creates a finder for the Payment entity
     */
    public static Model.Finder<Long, Payment> find = new Model.Finder<>(Long.class, Payment.class);

}

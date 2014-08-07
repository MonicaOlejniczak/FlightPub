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
     * The name on payer's card
     */
    @ManyToOne(cascade = CascadeType.ALL)
    public String cardName;

    /**
     * The payer's card number
     */
    @ManyToOne(cascade = CascadeType.ALL)
    public Integer cardNumber;

    /**
     * The payer's card CVV
     */
    @ManyToOne(cascade = CascadeType.ALL)
    public Integer cardCVV;

    /**
     * The payer's card's expiry month
     */
    @ManyToOne(cascade = CascadeType.ALL)
    public String expirationMonth;

    /**
     * The payer's card's expiry year
     */
    @ManyToOne(cascade = CascadeType.ALL)
    public String expirationYear;

    /**
     * The payer's PayPal username
     */
    @ManyToOne(cascade = CascadeType.ALL)
    public String ppUsername;

    /**
     * The payer's PayPal password
     */
    @ManyToOne(cascade = CascadeType.ALL)
    public String ppPassword;

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
	 * @param cardNumber the card number
	 * @param cardCVV the card CVV
	 * @param expirationMonth the expiration month of the card
	 * @param expirationYear the expiration year of the card
     * @param ppUsername the paypal username
     * @param ppPassword the paypal password
	 */
    public Payment(String paymentMethod, String cardName, Integer cardNumber, Integer cardCVV, String expirationMonth, String expirationYear, String ppUsername, String ppPassword) {
	    this.paymentMethod = paymentMethod;
	    this.cardName = cardName;
	    this.cardNumber = cardNumber;
	    this.cardCVV = cardCVV;
	    this.expirationMonth = expirationMonth;
	    this.expirationYear = expirationYear;
	    this.ppUsername = ppUsername;
	    this.ppPassword = ppPassword;
    }

    /**
     * Creates a finder for the Payment entity
     */
    public static Model.Finder<Long, Payment> find = new Model.Finder<>(Long.class, Payment.class);

}

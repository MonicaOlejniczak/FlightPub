package models;

import play.data.validation.Constraints;
import play.db.ebean.Model;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class Payment extends Model{
    /**
     * Uniquely identifies the booking
     */
    @Id
    public Long id;

    /**
     * The user that the payment details correspond to.
     */
    @Constraints.Required
    @ManyToOne(cascade = CascadeType.ALL)
    public User pUser;

    /**
     * The first name of the user
     */
    @Constraints.Required
    @ManyToOne(cascade = CascadeType.ALL)
    public String pFirstName;

    /**
     * The first name of the user
     */
    @Constraints.Required
    @ManyToOne(cascade = CascadeType.ALL)
    public String pSurname;

    /**
     * The street address of the payer
     */
    @Constraints.Required
    @ManyToOne(cascade = CascadeType.ALL)
    public String street;

    /**
     * The suburb/city of the payer
     */
    @Constraints.Required
    @ManyToOne(cascade = CascadeType.ALL)
    public String suburb;

    /**
     * The state the payer resides in
     */
    @Constraints.Required
    @ManyToOne(cascade = CascadeType.ALL)
    public String pState;

    /**
     * The payer's post code
     */
    @Constraints.Required
    @ManyToOne(cascade = CascadeType.ALL)
    public int pCode;

    /**
     * The phone number of the payer
     */
    @Constraints.Required
    @ManyToOne(cascade = CascadeType.ALL)
    public int phoneNum;

    /**
     * The name on payer's card
     */
    @ManyToOne(cascade = CascadeType.ALL)
    public String cardName;

    /**
     * The payer's card number
     */
    @ManyToOne(cascade = CascadeType.ALL)
    public int cardNum;

    /**
     * The payer's card CVV
     */
    @ManyToOne(cascade = CascadeType.ALL)
    public int cardCVV;

    /**
     * The payer's card's expiry month
     */
    @ManyToOne(cascade = CascadeType.ALL)
    public String expMonth;

    /**
     * The payer's card's expiry year
     */
    @ManyToOne(cascade = CascadeType.ALL)
    public String expYear;

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
     * Class constructor setting the required variables of the class
     */
    public Payment(User pUser, String pFirstName, String pSurname, String street, String suburb, String pState, int pCode, int phoneNum) {
        this.pUser = pUser;
        this.pFirstName = pFirstName;
        this.pSurname = pSurname;
        this.street = street;
        this.suburb = suburb;
        this.pState = pState;
        this.pCode = pCode;
        this.phoneNum = phoneNum;

    }

    /**
     * Function for adding card details if payer is using a credit card
     * @param cardName  Name on credit card
     * @param cardNum   Card number
     * @param cardCVV   Card CVV
     * @param expMonth  Month card expires
     * @param expYear   Year card expires
     */
    public void addCardDetails(String cardName, int cardNum, int cardCVV, String expMonth, String expYear) {
        this.cardName = cardName;
        this.cardNum = cardNum;
        this.cardCVV = cardCVV;
        this.expMonth = expMonth;
        this.expYear = expYear;
    }

    /**
     * Function for adding PayPal account details if payer is paying through paypal
     * @param ppUsername    PayPal username
     * @param ppPassword    PayPal password
     */
    public void addPPDetails(String ppUsername, String ppPassword) {
        this.ppUsername = ppUsername;
        this.ppPassword = ppPassword;
    }

    /**
     * Creates a finder for the Payment entity
     */
    public static Model.Finder<Long, Payment> find = new Model.Finder<>(Long.class, Payment.class);

}

package models;

import akka.util.Crypt;
import com.avaje.ebean.Expr;
import play.Play;
import play.api.libs.Codecs;
import play.data.format.Formats;
import play.data.validation.Constraints;
import play.db.ebean.Model;

import javax.persistence.*;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
public class User extends Person {
    /**
     * An enumeration defining the user's theme
     */
    public enum Theme {
        LIGHT,
        DARK
    }

    /**
     * An enumeration defining the units being used by the user
     */
    public enum Units {
        METRIC,
        IMPERIAL
    }

    /**
     * Uniquely identifies the user
     */
    @Id
    public Long id;

    @Constraints.Email
    @Constraints.Required
    public String email;

    @Constraints.Required
    @Constraints.MinLength(8)
    public String password;

    @Constraints.Required
    @ManyToMany(mappedBy = "users", cascade = CascadeType.ALL)
    public List<Role> roles = new ArrayList<>();

    @Constraints.Required
    @Formats.DateTime(pattern="yyyy-MM-dd HH:mm:ss")
    public Date registrationDate;

    @Enumerated(EnumType.ORDINAL)
    @Constraints.Required
    public Theme theme;

    @Enumerated(EnumType.ORDINAL)
    @Constraints.Required
    public Units unit;

    @Constraints.MaxLength(100)
    @Constraints.Required
    public String streetAddress;

    @Constraints.MaxLength(100)
    @Constraints.Required
    public String suburb;

    @Constraints.MaxLength(50)
    @Constraints.Required
    public String state;

    @Constraints.MaxLength(8)
    @Constraints.Required
    public String paymentMethod;

	@Constraints.Required
    public Integer postcode;

	@Constraints.Required
    public Integer phoneNumber;

    @Constraints.MaxLength(30)
    public String cardName;

	@Constraints.Required
    public Integer cardNumber;

    @Constraints.MaxLength(130)
    public String ppUsername;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    public List<Booking> bookings = new ArrayList<>();

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    public List<FlightSearch> flightSearches = new ArrayList<>();

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    public List<Notification> notifications = new ArrayList<>();

    @OneToMany(mappedBy = "pUser", fetch = FetchType.LAZY)
    public List<Payment> paymentDetails = new ArrayList<>();

    /**
     * Class constructor setting the required variables of the class
     */
    public User(String firstName, String lastName, String email, String password) {
        super(firstName, lastName);
	    this.email = email;
        this.password = User.hashPassword(password, email);
        this.registrationDate = new Date();
        this.theme = Theme.LIGHT;
        this.unit= Units.METRIC;
	    this.streetAddress = null;
	    this.suburb = null;
	    this.state = null;
	    this.paymentMethod = null;
	    this.postcode = null;
	    this.phoneNumber = null;
	    this.cardName = null;
	    this.cardNumber = null;
	    this.ppUsername = null;
    }

    /**
     * Function for updating user's first name
     * @param firstName user's new first name
     */
    public void setFirstName(String firstName) {
        this.firstName = firstName;
        this.save();
    }

    /**
     * Function for updating user's last name
     * @param lastName user's new last name
     */
    public void setLastName(String lastName) {
        this.lastName = lastName;
        this.save();
    }

    /**
     * Function for updating user's phone number
     * @param phoneNumber user's new phone number
     */
    public void setPhoneNumber(int phoneNumber) {
        this.phoneNumber = phoneNumber;
        this.save();
    }

	/**
	 * Sets this User's password to the specified new password.
	 * @param password The new password to assign to this user, in plaintext.
	 */
	public void setPassword(String password) {
		this.password = User.hashPassword(password, this.email);
	}

    /**
     * Function for updating user's email address
     * @param email user's new email
     */
    public void setEmail(String email) {
        this.email = email;
        this.save();
    }

    /**
     * Function for updating user's street address
     * @param streetAddress user's new street address
     */
    public void setStreetAddress(String streetAddress) {
        this.streetAddress = streetAddress;
        this.save();
    }

    /**
     * Function for updating user's suburb
     * @param suburb user's new suburb
     */
    public void setSuburb(String suburb) {
        this.suburb = suburb;
        this.save();
    }

    /**
     * Function for updating user's state
     * @param userState user's new state
     */
    public void setState(String userState) {
        this.state = userState;
        this.save();
    }

    /**
     * Function for updating user's post code
     * @param postcode user's new post code
     */
    public void setPostcode(int postcode) {
        this.postcode = postcode;
        this.save();
    }

    /**
     * Function for updating user's preferred payment method
     * @param paymentMethod user's preferred payment method
     */
    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
        this.save();
    }

    /**
     * Function for updating user's card name
     * @param cardName user's new card name
     */
    public void setCardName(String cardName) {
        this.cardName = cardName;
        this.save();
    }

    /**
     * Function for updating user's card number
     * @param cardNumber user's new card number
     */
    public void setCardNumber(int cardNumber) {
        this.cardNumber = cardNumber;
        this.save();
    }

    /**
     * Function for updating user's paypal username
     * @param ppUsername user's new paypal username
     */
    public void setPpUsername(String ppUsername) {
        this.ppUsername = ppUsername;
        this.save();
    }

    /**
     * Registers a User account with the given registration details, returning a Boolean indicating success
     * or failure.
     * @param firstName The first name of the registering User.
     * @param lastName The last name of the registering User.
     * @param email The email address of the registering User.
     * @param password The plaintext password of the registering User.
     * @return A Boolean indicating whether or not the User is able to register with the suppl
     */
    public static Boolean register(String firstName, String lastName, String email, String password) {
        try {
            // Create a new user
            User user = new User(firstName, lastName, email, password);
            // TODO: Any additional configuration here
            // Save the user to the database
	        user.save();
            return true;
        } catch (Exception ignored) {
            return false;
        }
    }

    /**
     * Attempt to authenticate with the supplied email and passwordHash, returning a Boolean indicating success or
     * failure.
     * @param email The email address of the User to check.
     * @param password The plaintext password of the User to check.
     * @return A Boolean indicating whether or not the User was authenticated.
     */
    public static Boolean authenticate(String email, String password) {
        // Find a user with the specified credentials
        return (User.find.where().and(Expr.eq("email", email), Expr.eq("password", User.hashPassword(password, email))).findUnique() != null);
    }

    /**
     * Returns a hash of the specified plaintext password.
     * @param plaintextPassword The plaintext password to hash.
     * @param salt The salt used to secure the password hash.
     * @return A hash of the specified plaintext password.
     */
    private static String hashPassword(String plaintextPassword, String salt) {
        // Merge salt and password
        String passwordAndSalt = Play.application().configuration().getString("application.secret") +
                salt.substring(0, salt.length() / 2) + plaintextPassword + salt.substring(salt.length() / 2);

        try {
            // Create a SHA-512 message digest
            MessageDigest md = MessageDigest.getInstance("SHA-512");

            // Return the Base64-encoded hash
            return Codecs.toHexString(md.digest(passwordAndSalt.getBytes()));
        } catch (NoSuchAlgorithmException e) {
            return Crypt.sha1(passwordAndSalt);
        }
    }

    /**
     * Function for adding payment details to the user.
     * @param payDeets  The set of payment details being added to the payment details list.
     */
    public void addPayDetails(Payment payDeets) {
        paymentDetails.add(payDeets);
    }

    /**
     * Creates a finder for the User entity
     */
    public static Model.Finder<Long, User> find = new Model.Finder<>(Long.class, User.class);
}

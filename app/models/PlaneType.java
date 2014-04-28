package models;

import play.db.ebean.Model;
import play.data.validation.Constraints;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class PlaneType extends Model {

    @Id
    public Long id;

    @Constraints.Required
    public String code;

    @Constraints.Required
    @Constraints.MinLength(3)
    @Constraints.MaxLength(30)
    public String details;

    @Constraints.Required
    @Constraints.MinLength(1)
    @Constraints.MaxLength(4)
    public int firstClassAmount;

    @Constraints.Required
    @Constraints.MinLength(1)
    @Constraints.MaxLength(4)
    public int businessClassAmount;

    @Constraints.Required
    @Constraints.MinLength(1)
    @Constraints.MaxLength(4)
    public int premiumEconomyClassAmount;

    @Constraints.Required
    @Constraints.MinLength(1)
    @Constraints.MaxLength(4)
    public int economyClassAmount;

    public PlaneType(String code, String details, int firstClassAmount, int businessClassAmount, int premiumEconomyClassAmount, int economyClassAmount) {
        this.code = code;
        this.details = details;
        this.firstClassAmount = firstClassAmount;
        this.businessClassAmount = businessClassAmount;
        this.premiumEconomyClassAmount = premiumEconomyClassAmount;
        this.economyClassAmount = economyClassAmount;
    }

    public static Model.Finder<Long, PlaneType> find = new Model.Finder<>(Long.class, PlaneType.class);

}

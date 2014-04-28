package models;

import play.db.ebean.Model;
import play.data.validation.Constraints;

import javax.persistence.*;

import java.util.ArrayList;
import java.util.List;

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
    @Constraints.Min(0)
    @Constraints.MinLength(1)
    @Constraints.MaxLength(4)
    public int firstClassAmount;

    @Constraints.Required
    @Constraints.Min(0)
    @Constraints.MinLength(1)
    @Constraints.MaxLength(4)
    public int businessClassAmount;

    @Constraints.Required
    @Constraints.Min(0)
    @Constraints.MinLength(1)
    @Constraints.MaxLength(4)
    public int premiumEconomyClassAmount;

    @Constraints.Required
    @Constraints.Min(0)
    @Constraints.MinLength(1)
    @Constraints.MaxLength(4)
    public int economyClassAmount;

    @OneToMany(mappedBy = "planeType", fetch = FetchType.LAZY)
    public List<Flight> flights = new ArrayList<>();

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

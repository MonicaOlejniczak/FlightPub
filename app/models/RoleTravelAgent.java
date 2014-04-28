package models;

import play.db.ebean.Model;

public class RoleTravelAgent extends Role {

    public static Model.Finder<Long, RoleTravelAgent> find = new Model.Finder<>(Long.class, RoleTravelAgent.class);

}

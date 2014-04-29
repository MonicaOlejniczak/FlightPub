package models;

import play.db.ebean.Model;

public class RoleSiteManager extends Role {

	public static Model.Finder<Long, RoleSiteManager> find = new Model.Finder<>(Long.class, RoleSiteManager.class);

}

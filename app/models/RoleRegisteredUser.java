package models;

import play.db.ebean.Model;

public class RoleRegisteredUser extends Role {

	public static Model.Finder<Long, RoleRegisteredUser> find = new Model.Finder<>(Long.class, RoleRegisteredUser.class);

}

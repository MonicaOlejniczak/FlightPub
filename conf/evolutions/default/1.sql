# --- Created by Ebean DDL
# To stop Ebean DDL generation, remove this comment and start using Evolutions

# --- !Ups

create table airline (
  id                        bigint auto_increment not null,
  code                      varchar(255),
  name                      varchar(255),
  country_id                bigint,
  constraint pk_airline primary key (id))
;

create table airport (
  id                        bigint auto_increment not null,
  code                      varchar(255),
  name                      varchar(255),
  country_id                bigint,
  constraint pk_airport primary key (id))
;

create table availability (
  id                        bigint auto_increment not null,
  airline_id                bigint,
  flight_id                 bigint,
  ticket_type_id            bigint,
  number_available_seats_leg_one integer,
  number_available_seats_leg_two integer,
  constraint pk_availability primary key (id))
;

create table country (
  id                        bigint auto_increment not null,
  country_code2             varchar(255),
  country_code3             varchar(255),
  name                      varchar(255),
  alternate_name_one        varchar(255),
  alternate_name_two        varchar(255),
  mother_country_id         bigint,
  mother_country_comment    varchar(255),
  constraint pk_country primary key (id))
;

create table distance (
  id                        bigint auto_increment not null,
  source_id                 bigint,
  destination_id            bigint,
  distance                  integer,
  constraint pk_distance primary key (id))
;

create table flight (
  id                        bigint auto_increment not null,
  airline_id                bigint,
  flight_number             varchar(255),
  departure_code            varchar(255),
  stop_over_code            varchar(255),
  destination_code          varchar(255),
  departure_time            varchar(255),
  arrival_time_stop_over    varchar(255),
  departure_time_stop_over  varchar(255),
  arrival_time              varchar(255),
  plane_code                varchar(255),
  duration                  integer,
  duration_second_leg       integer,
  constraint pk_flight primary key (id))
;

create table plane_type (
  id                        bigint auto_increment not null,
  code                      varchar(255),
  details                   varchar(255),
  first_class_amount        integer,
  business_class_amount     integer,
  premium_economy_class_amount integer,
  economy_class_amount      integer,
  constraint pk_plane_type primary key (id))
;

create table price (
  id                        bigint auto_increment not null,
  flight_id                 bigint,
  airline_id                bigint,
  ticket_class_id           bigint,
  ticket_type_id            bigint,
  start_date                varchar(255),
  end_date                  varchar(255),
  price                     double,
  price_leg_one             double,
  price_leg_two             double,
  constraint pk_price primary key (id))
;

create table ticket_class (
  id                        bigint auto_increment not null,
  code                      varchar(255),
  details                   varchar(255),
  constraint pk_ticket_class primary key (id))
;

create table ticket_type (
  id                        bigint auto_increment not null,
  code                      varchar(255),
  name                      varchar(255),
  transferrable             tinyint(1) default 0,
  refundable                tinyint(1) default 0,
  exchangeable              tinyint(1) default 0,
  frequent_flyer_points     tinyint(1) default 0,
  constraint pk_ticket_type primary key (id))
;

alter table airline add constraint fk_airline_country_1 foreign key (country_id) references country (id) on delete restrict on update restrict;
create index ix_airline_country_1 on airline (country_id);
alter table airport add constraint fk_airport_country_2 foreign key (country_id) references country (id) on delete restrict on update restrict;
create index ix_airport_country_2 on airport (country_id);
alter table availability add constraint fk_availability_airline_3 foreign key (airline_id) references airline (id) on delete restrict on update restrict;
create index ix_availability_airline_3 on availability (airline_id);
alter table availability add constraint fk_availability_flight_4 foreign key (flight_id) references flight (id) on delete restrict on update restrict;
create index ix_availability_flight_4 on availability (flight_id);
alter table availability add constraint fk_availability_ticketType_5 foreign key (ticket_type_id) references ticket_type (id) on delete restrict on update restrict;
create index ix_availability_ticketType_5 on availability (ticket_type_id);
alter table country add constraint fk_country_motherCountry_6 foreign key (mother_country_id) references country (id) on delete restrict on update restrict;
create index ix_country_motherCountry_6 on country (mother_country_id);
alter table distance add constraint fk_distance_source_7 foreign key (source_id) references airport (id) on delete restrict on update restrict;
create index ix_distance_source_7 on distance (source_id);
alter table distance add constraint fk_distance_destination_8 foreign key (destination_id) references airport (id) on delete restrict on update restrict;
create index ix_distance_destination_8 on distance (destination_id);
alter table flight add constraint fk_flight_airline_9 foreign key (airline_id) references airline (id) on delete restrict on update restrict;
create index ix_flight_airline_9 on flight (airline_id);
alter table price add constraint fk_price_flight_10 foreign key (flight_id) references flight (id) on delete restrict on update restrict;
create index ix_price_flight_10 on price (flight_id);
alter table price add constraint fk_price_airline_11 foreign key (airline_id) references airline (id) on delete restrict on update restrict;
create index ix_price_airline_11 on price (airline_id);
alter table price add constraint fk_price_ticketClass_12 foreign key (ticket_class_id) references ticket_class (id) on delete restrict on update restrict;
create index ix_price_ticketClass_12 on price (ticket_class_id);
alter table price add constraint fk_price_ticketType_13 foreign key (ticket_type_id) references ticket_type (id) on delete restrict on update restrict;
create index ix_price_ticketType_13 on price (ticket_type_id);



# --- !Downs

SET FOREIGN_KEY_CHECKS=0;

drop table airline;

drop table airport;

drop table availability;

drop table country;

drop table distance;

drop table flight;

drop table plane_type;

drop table price;

drop table ticket_class;

drop table ticket_type;

SET FOREIGN_KEY_CHECKS=1;


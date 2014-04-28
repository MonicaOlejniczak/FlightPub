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

create table booking (
  id                        bigint auto_increment not null,
  user_id                   bigint,
  flight_id                 bigint,
  date                      datetime,
  booking_request_id        bigint,
  constraint pk_booking primary key (id))
;

create table booking_request (
  id                        bigint auto_increment not null,
  flight_id                 bigint,
  user_id                   bigint,
  date                      datetime,
  status                    integer,
  last_status_update_date   datetime,
  constraint ck_booking_request_status check (status in (0,1,2)),
  constraint pk_booking_request primary key (id))
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
  departure_time            datetime,
  arrival_time_stop_over    datetime,
  departure_time_stop_over  datetime,
  arrival_time              datetime,
  plane_type_id             bigint,
  duration                  integer,
  duration_second_leg       integer,
  constraint pk_flight primary key (id))
;

create table flight_search (
  id                        bigint auto_increment not null,
  user_id                   bigint,
  search_term               varchar(255),
  date                      datetime,
  constraint pk_flight_search primary key (id))
;

create table luggage (
  id                        bigint auto_increment not null,
  option                    integer,
  weight                    double,
  constraint ck_luggage_option check (option in (0,1)),
  constraint pk_luggage primary key (id))
;

create table message (
  id                        bigint auto_increment not null,
  user_id                   bigint,
  travel_agent_id           bigint,
  flight_id                 bigint,
  date                      datetime,
  status                    integer,
  reply                     tinyint(1) default 0,
  reply_date                datetime,
  constraint ck_message_status check (status in (0,1)),
  constraint pk_message primary key (id))
;

create table notification (
  id                        bigint auto_increment not null,
  user_id                   bigint,
  date                      datetime,
  message                   varchar(255),
  status                    integer,
  constraint ck_notification_status check (status in (0,1)),
  constraint pk_notification primary key (id))
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
  start_date                datetime,
  end_date                  datetime,
  price                     double,
  price_leg_one             double,
  price_leg_two             double,
  constraint pk_price primary key (id))
;

create table role (
  id                        bigint auto_increment not null,
  constraint pk_role primary key (id))
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

create table user (
  id                        bigint auto_increment not null,
  email                     varchar(255),
  password                  varchar(255),
  role_id                   bigint,
  alias                     varchar(255),
  first_name                varchar(255),
  last_name                 varchar(255),
  registration_date         datetime,
  constraint pk_user primary key (id))
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
alter table booking add constraint fk_booking_user_6 foreign key (user_id) references user (id) on delete restrict on update restrict;
create index ix_booking_user_6 on booking (user_id);
alter table booking add constraint fk_booking_flight_7 foreign key (flight_id) references flight (id) on delete restrict on update restrict;
create index ix_booking_flight_7 on booking (flight_id);
alter table booking add constraint fk_booking_bookingRequest_8 foreign key (booking_request_id) references booking_request (id) on delete restrict on update restrict;
create index ix_booking_bookingRequest_8 on booking (booking_request_id);
alter table booking_request add constraint fk_booking_request_flight_9 foreign key (flight_id) references flight (id) on delete restrict on update restrict;
create index ix_booking_request_flight_9 on booking_request (flight_id);
alter table booking_request add constraint fk_booking_request_user_10 foreign key (user_id) references user (id) on delete restrict on update restrict;
create index ix_booking_request_user_10 on booking_request (user_id);
alter table country add constraint fk_country_motherCountry_11 foreign key (mother_country_id) references country (id) on delete restrict on update restrict;
create index ix_country_motherCountry_11 on country (mother_country_id);
alter table distance add constraint fk_distance_source_12 foreign key (source_id) references airport (id) on delete restrict on update restrict;
create index ix_distance_source_12 on distance (source_id);
alter table distance add constraint fk_distance_destination_13 foreign key (destination_id) references airport (id) on delete restrict on update restrict;
create index ix_distance_destination_13 on distance (destination_id);
alter table flight add constraint fk_flight_airline_14 foreign key (airline_id) references airline (id) on delete restrict on update restrict;
create index ix_flight_airline_14 on flight (airline_id);
alter table flight add constraint fk_flight_planeType_15 foreign key (plane_type_id) references plane_type (id) on delete restrict on update restrict;
create index ix_flight_planeType_15 on flight (plane_type_id);
alter table flight_search add constraint fk_flight_search_user_16 foreign key (user_id) references user (id) on delete restrict on update restrict;
create index ix_flight_search_user_16 on flight_search (user_id);
alter table message add constraint fk_message_user_17 foreign key (user_id) references user (id) on delete restrict on update restrict;
create index ix_message_user_17 on message (user_id);
alter table message add constraint fk_message_travelAgent_18 foreign key (travel_agent_id) references user (id) on delete restrict on update restrict;
create index ix_message_travelAgent_18 on message (travel_agent_id);
alter table message add constraint fk_message_flight_19 foreign key (flight_id) references flight (id) on delete restrict on update restrict;
create index ix_message_flight_19 on message (flight_id);
alter table notification add constraint fk_notification_user_20 foreign key (user_id) references user (id) on delete restrict on update restrict;
create index ix_notification_user_20 on notification (user_id);
alter table price add constraint fk_price_flight_21 foreign key (flight_id) references flight (id) on delete restrict on update restrict;
create index ix_price_flight_21 on price (flight_id);
alter table price add constraint fk_price_airline_22 foreign key (airline_id) references airline (id) on delete restrict on update restrict;
create index ix_price_airline_22 on price (airline_id);
alter table price add constraint fk_price_ticketClass_23 foreign key (ticket_class_id) references ticket_class (id) on delete restrict on update restrict;
create index ix_price_ticketClass_23 on price (ticket_class_id);
alter table price add constraint fk_price_ticketType_24 foreign key (ticket_type_id) references ticket_type (id) on delete restrict on update restrict;
create index ix_price_ticketType_24 on price (ticket_type_id);
alter table user add constraint fk_user_role_25 foreign key (role_id) references role (id) on delete restrict on update restrict;
create index ix_user_role_25 on user (role_id);



# --- !Downs

SET FOREIGN_KEY_CHECKS=0;

drop table airline;

drop table airport;

drop table availability;

drop table booking;

drop table booking_request;

drop table country;

drop table distance;

drop table flight;

drop table flight_search;

drop table luggage;

drop table message;

drop table notification;

drop table plane_type;

drop table price;

drop table role;

drop table ticket_class;

drop table ticket_type;

drop table user;

SET FOREIGN_KEY_CHECKS=1;


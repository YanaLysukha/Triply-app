namespace my.travel;

using { cuid, managed } from '@sap/cds/common';

entity Destinations : cuid, managed {
  name        : String(100);
  country     : String(50);
  description : String(500);
  trips       : Association to many Trips on trips.destination = $self;
}

entity Trips : cuid, managed {
  title       : String(100);
  startDate   : Date;
  endDate     : Date;
  price       : Decimal(9, 2);
  destination : Association to Destinations;
  bookings    : Association to many Bookings on bookings.trip = $self;
}

entity Travelers : cuid, managed {
  firstName   : String(50);
  lastName    : String(50);
  email       : String(100);
  bookings    : Association to many Bookings on bookings.traveler = $self;
}

entity Bookings : cuid, managed {
  bookingNo   : String(10);
  bookingDate : Date;
  status      : String(20); // e.g. 'CONFIRMED', 'PENDING', 'CANCELLED'
  traveler    : Association to Travelers;
  trip        : Association to Trips;
}
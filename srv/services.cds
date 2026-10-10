using { my.travel as my } from '../db/schema';

service TravelService {
    @odata.draft.enabled

    entity Destinations as projection on my.Destinations;
    entity Trips        as projection on my.Trips;
    entity Travelers    as projection on my.Travelers;
    entity Bookings     as projection on my.Bookings;
}
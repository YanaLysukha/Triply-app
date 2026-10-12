using { my.travel as my } from '../db/schema';

service TravelService {
    entity Destinations as projection on my.Destinations;
    entity Trips        as projection on my.Trips;
    entity Travelers    as projection on my.Travelers;
    entity Bookings     as projection on my.Bookings;
}

annotate TravelService.Trips with @odata.draft.enabled;

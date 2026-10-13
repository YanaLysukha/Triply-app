using { my.travel as my } from '../db/schema';

service TravelService @(
    path: 'travel',
    requires: 'authenticated-user'
) {
    entity Trips @(restrict: [
        { grant: 'READ', to: 'viewer' },
        { grant: '*',    to: 'admin'  }
    ]) as projection on my.Trips;
    entity Bookings @(restrict: [
        { grant: 'READ', to: 'viewer' },
        { grant: '*',    to: 'admin'  }
    ]) as projection on my.Bookings;

    entity Destinations @readonly as projection on my.Destinations;

    entity Travelers @readonly as projection on my.Travelers;
}

annotate TravelService.Trips with @odata.draft.enabled;

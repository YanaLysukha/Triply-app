import cds from '@sap/cds';

export default class TravelService extends cds.ApplicationService {
    init() {
    const { Trips, Bookings } = this.entities;

    this.before(['CREATE', 'UPDATE'], Trips, this.validateTrip);
    this.before('CREATE', Bookings, this.setDefaultBookingValues);
    this.after('READ', Trips, this.enrichPremiumTrips);

    return super.init();
  }

  validateTrip(req) {
    const { startDate, endDate, price } = req.data;

    if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
      req.error(400, 'End date cannot be earlier than start date.');
    }

    if (price !== undefined && price < 0) {
      req.error(400, 'Price cannot be negative.');
    }
  }

  setDefaultBookingValues(req) {
    if (!req.data.status) {
      req.data.status = 'NEW';
    }
    if (!req.data.bookingNo) {
      req.data.bookingNo = `B${Math.floor(1000 + Math.random() * 9000)}`;
    }
  }

  enrichPremiumTrips(results) {
    if (!results) return;

    const trips = Array.isArray(results) ? results : [results];

    trips.forEach((trip) => {
      if (trip.price && trip.price >= 2000 && trip.title && !trip.title.startsWith('[Premium]')) {
        trip.title = `[Premium] ${trip.title}`;
      }
    });
  }
}
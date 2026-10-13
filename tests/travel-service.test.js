import cds from '@sap/cds';
import { fileURLToPath } from 'node:url';

const projectRoot = fileURLToPath(new URL('..', import.meta.url));
const server = cds.test(projectRoot);
const { GET, POST } = server;

const BASE = '/odata/v4/travel';
const ADMIN = { auth: { username: 'admin', password: '' } };
const ALICE = { auth: { username: 'alice', password: '' } };

const PARIS_ID = '1011c750-8a4e-4f3b-a9bb-1a2b3c4d5e6f';
const ROME_ID = '3011c750-8a4e-4f3b-a9bb-1a2b3c4d5e6f';
const WEEKEND_PARIS_ID = 'a1111111-1111-1111-1111-111111111111';
const TOKYO_TOUR_ID = 'a3333333-3333-3333-3333-333333333333';

const activeTrip = (id) => `${BASE}/Trips(ID=${id},IsActiveEntity=true)`;
const draftTrip = (id) => `${BASE}/Trips(ID=${id},IsActiveEntity=false)`;

async function createAndActivateTrip(data, user = ADMIN) {
  const { data: draft } = await POST(`${BASE}/Trips`, data, user);
  await POST(`${draftTrip(draft.ID)}/TravelService.draftActivate`, {}, user);
  return draft.ID;
}

describe('TravelService', () => {
  beforeEach(async () => {
    await server.data.reset();
  });

  describe('Read', () => {
    test('GET /Trips returns all 3 trips from test data', async () => {
      const { status, data } = await GET(`${BASE}/Trips`, ADMIN);

      expect(status).toBe(200);
      expect(data.value).toHaveLength(3);
    });

    test('GET single trip by key returns correct field values', async () => {
      const { status, data } = await GET(activeTrip(WEEKEND_PARIS_ID), ADMIN);

      expect(status).toBe(200);
      expect(data).toMatchObject({
        ID: WEEKEND_PARIS_ID,
        title: 'Weekend in Paris',
        startDate: '2026-05-01',
        endDate: '2026-05-03',
        destination_ID: PARIS_ID,
        IsActiveEntity: true,
      });
      expect(Number(data.price)).toBe(450);
    });
  });

  describe('Create', () => {
    test('POST + draftActivate creates a new trip', async () => {
      const newId = await createAndActivateTrip({
        title: 'Rome Highlights',
        startDate: '2026-07-01',
        endDate: '2026-07-05',
        price: 800,
        destination_ID: ROME_ID,
      });

      const { data } = await GET(activeTrip(newId), ADMIN);
      expect(data).toMatchObject({
        title: 'Rome Highlights',
        startDate: '2026-07-01',
        endDate: '2026-07-05',
        destination_ID: ROME_ID,
        createdBy: 'admin',
      });
      expect(Number(data.price)).toBe(800);

      const { data: all } = await GET(`${BASE}/Trips`, ADMIN);
      expect(all.value).toHaveLength(4);
    });
  });

  describe('Custom handlers', () => {
    test('trips with price >= 2000 get the [Premium] prefix', async () => {
      const { data: tokyo } = await GET(activeTrip(TOKYO_TOUR_ID), ADMIN);
      expect(tokyo.title).toBe('[Premium] Tokyo Food & Culture Tour');

      const { data: paris } = await GET(activeTrip(WEEKEND_PARIS_ID), ADMIN);
      expect(paris.title).toBe('Weekend in Paris');
    });

    test('rejects a trip whose end date is before its start date', async () => {
      await expect(
        createAndActivateTrip({
          title: 'Broken Dates',
          startDate: '2026-08-10',
          endDate: '2026-08-01',
          price: 100,
          destination_ID: ROME_ID,
        })
      ).rejects.toThrow(/End date cannot be earlier than start date/);
    });

    test('rejects a trip with a negative price', async () => {
      await expect(
        createAndActivateTrip({
          title: 'Negative Price',
          startDate: '2026-08-01',
          endDate: '2026-08-05',
          price: -50,
          destination_ID: ROME_ID,
        })
      ).rejects.toThrow(/Price cannot be negative/);
    });
  });

  describe('Authorization', () => {
    test('anonymous request is rejected with 401', async () => {
      await expect(GET(`${BASE}/Trips`)).rejects.toThrow(/401/);
    });

    test('viewer (alice) can read trips', async () => {
      const { status } = await GET(`${BASE}/Trips`, ALICE);
      expect(status).toBe(200);
    });

    test('viewer (alice) cannot create trips - 403', async () => {
      await expect(
        POST(`${BASE}/Trips`, { title: 'Not allowed' }, ALICE)
      ).rejects.toThrow(/403/);
    });
  });
});
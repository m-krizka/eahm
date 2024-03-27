import db from './db';

export default async function getConstantsForRegistration(req, res) {
  const { registration } = req.params;

  const fleetIdentifiersRecord = await db['/api/fleet-identifiers'].findOne({ registration });

  const { aircraftType } = fleetIdentifiersRecord;
  const aircraftConstantsRecord = await db['/api/aircraft-constants'].findOne({ aircraftType });

  res.json(aircraftConstantsRecord);
}

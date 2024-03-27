import db from './db';

export default async function getConstantsForType(req, res) {
  const { aircraftType } = req.params;

  const aircraftConstantsRecord = await db['/api/aircraft-constants'].findOne({ aircraftType });

  res.json(aircraftConstantsRecord);
}

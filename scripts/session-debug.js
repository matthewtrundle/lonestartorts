const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function debugSessions() {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const events = await prisma.analyticsEvent.findMany({
    where: { receivedAt: { gte: sevenDaysAgo } },
    select: {
      sessionId: true,
      deviceId: true,
      eventType: true,
      path: true,
      rawJson: true,
    },
    take: 50
  });

  console.log('=== SESSION ID DEBUG ===\n');
  console.log('Sample of 50 recent events:\n');

  // Count sessionId values
  const sessionIds = {};
  const deviceIds = {};

  events.forEach((e, idx) => {
    const sid = e.sessionId?.toString() || 'NULL';
    const did = e.deviceId?.toString() || 'NULL';
    sessionIds[sid] = (sessionIds[sid] || 0) + 1;
    deviceIds[did] = (deviceIds[did] || 0) + 1;

    if (idx < 10) {
      console.log(`Event ${idx + 1}:`);
      console.log(`  sessionId: ${sid}`);
      console.log(`  deviceId: ${did}`);
      console.log(`  type: ${e.eventType}`);
      console.log(`  path: ${e.path}`);
      console.log(`  rawJson.sessionId: ${e.rawJson?.sessionId || 'not in rawJson'}`);
      console.log('');
    }
  });

  console.log('=== SESSION ID DISTRIBUTION ===');
  Object.entries(sessionIds).forEach(([id, count]) => {
    console.log(`  ${id}: ${count} events`);
  });

  console.log('\n=== DEVICE ID DISTRIBUTION ===');
  Object.entries(deviceIds).forEach(([id, count]) => {
    console.log(`  ${id}: ${count} events`);
  });

  // Check what identifiers are in rawJson
  console.log('\n=== RAW JSON IDENTIFIERS ===');
  const rawIdentifiers = new Set();
  events.forEach(e => {
    if (e.rawJson) {
      Object.keys(e.rawJson).forEach(key => {
        if (key.toLowerCase().includes('id') || key.toLowerCase().includes('session') || key.toLowerCase().includes('user') || key.toLowerCase().includes('anonymous')) {
          rawIdentifiers.add(key);
        }
      });
    }
  });
  console.log('Identifier fields found in rawJson:');
  Array.from(rawIdentifiers).forEach(id => {
    console.log(`  - ${id}`);
  });

  // Sample a rawJson to see full structure
  console.log('\n=== SAMPLE RAW JSON STRUCTURE ===');
  const sampleEvent = events.find(e => e.rawJson);
  if (sampleEvent) {
    console.log(JSON.stringify(sampleEvent.rawJson, null, 2));
  }

  await prisma.$disconnect();
}

debugSessions().catch(console.error);

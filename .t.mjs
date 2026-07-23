import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const now = new Date('2026-07-10T00:00:00-05:00');
const d = (days) => new Date(now.getTime() - days*86400000);

async function window(label, since) {
  const o = await prisma.order.findMany({
    where: { createdAt: { gte: since }, paymentStatus: 'SUCCEEDED' },
    select: { total: true, subtotal: true, email: true, retailSubscriptionId: true, createdAt: true },
  });
  const rev = o.reduce((s,x)=>s+x.total,0)/100;
  const subs = o.filter(x=>x.retailSubscriptionId).length;
  const emails = new Set(o.map(x=>x.email));
  console.log(`${label}: ${o.length} orders, $${rev.toFixed(0)} revenue, AOV $${(rev/o.length||0).toFixed(2)}, ${subs} sub-renewals, ${emails.size} unique customers`);
  return { orders:o.length, rev, emails };
}
await window('Last 30 days ', d(30));
await window('Last 90 days ', d(90));
const yr = await window('Last 365 days', d(365));

// Repeat rate over the year
const all = await prisma.order.findMany({ where:{ createdAt:{gte:d(365)}, paymentStatus:'SUCCEEDED'}, select:{email:true}});
const counts = {}; all.forEach(o=>counts[o.email]=(counts[o.email]||0)+1);
const repeat = Object.values(counts).filter(c=>c>1).length;
console.log(`\nRepeat customers (2+ orders, 12mo): ${repeat} of ${Object.keys(counts).length} (${(100*repeat/Object.keys(counts).length).toFixed(0)}%)`);

// Active subscriptions (recurring revenue)
const activeSubs = await prisma.retailSubscription.count({ where:{ status:'ACTIVE' }});
const subRev = await prisma.retailSubscription.aggregate({ where:{status:'ACTIVE'}, _sum:{ total:true }});
console.log(`Active subscriptions: ${activeSubs}, monthly recurring ~$${((subRev._sum.total||0)/100).toFixed(0)}`);
await prisma.$disconnect();

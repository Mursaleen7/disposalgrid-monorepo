import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting seed mechanism...");

  // 1. Create a Material
  const electronics = await prisma.material.upsert({
    where: { slug: "electronics" },
    update: {},
    create: {
      slug: "electronics",
      name: "Electronics",
      description: "End-of-life electronics (e-waste) contain hazardous materials like lead and mercury.",
      federalLaw: "Resource Conservation and Recovery Act (RCRA)",
      color: "bg-info",
    },
  });

  // 2. Create State/County relationships
  await prisma.stateMaterial.upsert({
    where: {
      state_materialId: {
        state: "texas",
        materialId: electronics.id,
      },
    },
    update: {},
    create: {
      state: "texas",
      stateName: "Texas",
      materialId: electronics.id,
      lawName: "Texas Computer Equipment Recycling Act",
      lawSummary: "Texas requires computer and TV manufacturers to offer free and convenient recycling. Disposing of CRT monitors in municipal solid waste landfills is highly discouraged.",
      status: "voluntary",
      lastVerified: new Date(),
    },
  });

  await prisma.countyMaterial.upsert({
    where: {
      county_state_materialId: {
        county: "harris-county",
        state: "texas",
        materialId: electronics.id,
      },
    },
    update: {},
    create: {
      county: "harris-county",
      state: "texas",
      materialId: electronics.id,
      facilityCount: 14,
      freeCount: 3,
      upcomingEvents: 2,
      lastVerified: new Date(),
      stateLaw: "Texas requires computer and TV manufacturers to offer free and convenient recycling. Disposing of CRT monitors in municipal solid waste landfills is highly discouraged.",
    },
  });

  // 3. Create 5 Facilities
  const facilitiesData = [
    {
      epaHandlerId: "TXD123456781",
      name: "Westpark Consumer Recycling Center",
      address: "5900 Westpark Dr",
      city: "Houston",
      state: "TX",
      county: "Harris County",
      zipCode: "77057",
      latitude: 29.7289,
      longitude: -95.4851,
      status: "Active — Open to Public",
      operationalType: "Operating TSDF",
      hours: JSON.stringify({
        summary: "Mon–Fri 8am–5pm · Sat 8am–2pm",
        details: [
          { day: "Monday", hours: "8:00 AM – 5:00 PM" },
          { day: "Tuesday", hours: "8:00 AM – 5:00 PM" },
          { day: "Wednesday", hours: "8:00 AM – 5:00 PM" },
          { day: "Thursday", hours: "8:00 AM – 5:00 PM" },
          { day: "Friday", hours: "8:00 AM – 5:00 PM" },
          { day: "Saturday", hours: "8:00 AM – 2:00 PM" },
          { day: "Sunday", hours: "Closed" },
        ]
      }),
      acceptedCodes: JSON.stringify(["Televisions (< 27\")", "Computer Monitors", "Laptops & Tablets", "Printers", "Batteries"]),
      isPublic: true,
      isFree: true,
      hasAppointment: false,
      lastVerified: new Date(),
      complianceHistory: JSON.stringify([
        { date: "Oct 12, 2023", type: "State Inspection", outcome: "Passed" }
      ]),
    },
    {
       epaHandlerId: "TXD123456782",
       name: "Harris County Household Hazardous Waste",
       address: "6900 Hahl Rd",
       city: "Houston",
       state: "TX",
       county: "Harris County",
       zipCode: "77040",
       latitude: 29.8512,
       longitude: -95.5342,
       status: "Active — Appointment Required",
       operationalType: "County Drop-off",
       hours: JSON.stringify({ summary: "Wednesdays & 2nd Saturday" }),
       acceptedCodes: JSON.stringify(["Electronics", "Paint", "Chemicals"]),
       isPublic: true,
       isFree: true,
       hasAppointment: true,
       lastVerified: new Date(),
       complianceHistory: JSON.stringify([]),
    },
    {
       epaHandlerId: "TXD123456783",
       name: "CompuCycle",
       address: "8019 Kempwood Dr",
       city: "Houston",
       state: "TX",
       county: "Harris County",
       zipCode: "77055",
       latitude: 29.8210,
       longitude: -95.5101,
       status: "Active",
       operationalType: "Commercial Recycler",
       hours: JSON.stringify({ summary: "Mon-Fri 8:00AM - 5:00PM" }),
       acceptedCodes: JSON.stringify(["All e-waste"]),
       isPublic: true,
       isFree: true,
       hasAppointment: false,
       lastVerified: new Date(),
       complianceHistory: JSON.stringify([]),
    },
    {
       epaHandlerId: "TXD123456784",
       name: "City of Houston North Main Center",
       address: "9003 N Main St",
       city: "Houston",
       state: "TX",
       county: "Harris County",
       zipCode: "77022",
       latitude: 29.8451,
       longitude: -95.3850,
       status: "Active",
       operationalType: "City Drop-off",
       hours: JSON.stringify({ summary: "Tue-Sun 9am-6pm" }),
       acceptedCodes: JSON.stringify(["Monitors", "Computers", "Limit: 3 items"]),
       isPublic: true,
       isFree: false,
       hasAppointment: false,
       lastVerified: new Date(),
       complianceHistory: JSON.stringify([]),
    },
    {
       epaHandlerId: "TXD123456785",
       name: "Pct 4 Environmental Center",
       address: "4603 Spring Cypress Rd",
       city: "Spring",
       state: "TX",
       county: "Harris County",
       zipCode: "77373",
       latitude: 30.0450,
       longitude: -95.4501,
       status: "Active",
       operationalType: "County Drop-off",
       hours: JSON.stringify({ summary: "Mon-Sat 8am-4pm" }),
       acceptedCodes: JSON.stringify(["All e-waste accepted"]),
       isPublic: true,
       isFree: false,
       hasAppointment: false,
       lastVerified: new Date(),
       complianceHistory: JSON.stringify([]),
    }
  ];

  for (const fac of facilitiesData) {
    await prisma.facility.upsert({
      where: { epaHandlerId: fac.epaHandlerId },
      update: {},
      create: fac,
    });
  }

  // 4. Create an overlapping HHW event
  const hhwEvt = await prisma.hhwEvent.upsert({
    where: { id: "evt-001" },
    update: {},
    create: {
      id: "evt-001",
      title: "Spring HHW Collection Day",
      county: "Harris County",
      state: "TX",
      address: "Cy-Fair Annex Parking Lot",
      latitude: 29.9123,
      longitude: -95.6210,
      startDate: new Date("2026-04-28T08:00:00Z"),
      endDate: new Date("2026-04-28T14:00:00Z"),
      acceptedItems: JSON.stringify(["Electronics", "Paint", "Batteries", "Motor Oil", "Solvents"]),
      restrictions: JSON.stringify(["No business waste"]),
      organizer: "Harris County Environmental Services",
    }
  });

  console.log("✅ Seed complete");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

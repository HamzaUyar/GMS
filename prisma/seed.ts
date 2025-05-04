import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// --- Mock Data (Subset for Seed Script) ---
// Advisors are no longer seeded here; they will be created via onboarding API if they log in.

const departmentNames = [
  'Physics',
  'Photonics',
  'Chemistry',
  'Mathematics',
  'Molecular Biology and Genetics',
  'Computer Engineering',
  'Bioengineering',
  'Environmental Engineering',
  'Energy Systems Engineering',
  'Electrical and Electronics Engineering',
  'Food Engineering',
  'Civil Engineering',
  'Chemical Engineering',
  'Mechanical Engineering',
  'Materials Science and Engineering',
  'Industrial Design',
  'Conservation and Restoration of Cultural Heritage',
  'Architecture',
  'City and Regional Planning',
];

// Function to generate email from department name
function generateEmail(name: string): string {
  // Convert to lowercase, replace spaces and special chars with hyphens
  const slug = name
    .toLowerCase()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/[^a-z0-9-]/g, ''); // Remove remaining non-alphanumeric chars except hyphens
  return `${slug}@example.com`; // Using example.com domain
}

async function main() {
  console.log(`Start seeding ...`);

  // Seed Departments
  console.log('Seeding departments...');
  for (const name of departmentNames) {
    const email = generateEmail(name);
    const department = await prisma.department.upsert({
      where: { email: email },
      update: { name: name },
      create: {
        name: name,
        email: email,
      },
    });
    console.log(`  Created/updated department: ${department.name} (ID: ${department.id})`);
  }

  // // Seed Advisors - REMOVED as per user request
  // console.log('\nSeeding advisors...');
  // for (const advisorData of mockAdvisors) {
  //   const { id: mockId, ...createData } = advisorData;
  //   const advisor = await prisma.advisor.upsert({
  //     where: { email: createData.email },
  //     update: { ... },
  //     create: createData,
  //   });
  //   console.log(`  Created/updated advisor: ${advisor.name} (DB ID: ${advisor.id})`);
  // }

  console.log(`\nSeeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.$connect();
    console.log('Successfully connected to the database.');
    
    // Perform a simple query
    const usersCount = await prisma.user.count();
    console.log(`Found ${usersCount} users in the database.`);
  } catch (error) {
    console.error('Failed to connect to the database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();

import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
   
}

main()
    .catch(e => {
        // if error console log error and exit process
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        // close prisma Client at end
        await prisma.$disconnect();
    });
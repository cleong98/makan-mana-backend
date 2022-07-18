import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {

     await prisma.gender.upsert({
        where: { title: "Male" },
        update: {},
        create: {
            title: "Male",
        }
    });

    await prisma.gender.upsert({
        where: { title: "Female" },
        update: {},
        create: {
            title: "Female",
        }
    });

    await prisma.gender.upsert({
        where: { title: "Non-binary" },
        update: {},
        create: {
            title: "Non-binary",
        }
    });
   
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
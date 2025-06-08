import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function createUser() {
  try {
    const hashedPassword = await bcrypt.hash('password', 10);

    const user = await prisma.user.create({
      data: {
        email: 'admin@example.com',
        name: 'admin',
        password: hashedPassword,
      },
    });

    console.log('Created user:', user);
  } catch (error) {
    console.error('Error creating user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createUser(); 
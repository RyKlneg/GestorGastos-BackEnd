import { config } from 'dotenv';
import { AppDataSource } from '../../config/data-source';
import { seedExpenses } from './expense.seed';

// Load environment variables
config();

async function runSeeds() {
  try {
    await AppDataSource.initialize();
    console.log('Data Source has been initialized!');

    await seedExpenses(AppDataSource);

    await AppDataSource.destroy();
    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error during seeding:', error);
    process.exit(1);
  }
}

runSeeds();


// This is an example file showing how to configure DataSource
// Copy this configuration to your actual data-source.ts file

import { DataSource } from 'typeorm';
import { Expense } from '../expenses/entities/expense.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || '127.0.0.1',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || '123456',
  database: process.env.DB_DATABASE || 'expenses_db',
  entities: [Expense],
  migrations: ['src/database/migrations/*.ts'],
  synchronize: false, // Set to false in production
  logging: false,
});

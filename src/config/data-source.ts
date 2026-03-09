import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { Expense } from '../expenses/entities/expense.entity';

config();

const databaseUrl = process.env.DATABASE_URL;

export const AppDataSource = databaseUrl
  ? new DataSource({
      type: 'postgres',
      url: databaseUrl,
      entities: [Expense],
      migrations: ['src/database/migrations/*.ts'],
      synchronize: false,
      logging: false,
      ssl: { rejectUnauthorized: false },
    })
  : new DataSource({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_DATABASE || 'expenses_db',
      entities: [Expense],
      migrations: ['src/database/migrations/*.ts'],
      synchronize: false,
      logging: false,
      ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
    });


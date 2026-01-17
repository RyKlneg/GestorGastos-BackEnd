import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpensesModule } from './expenses/expenses.module';
import { Expense } from './expenses/entities/expense.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const isProd = configService.get('NODE_ENV') === 'production';

        return {
          type: 'postgres',
          url: configService.get<string>('DATABASE_URL'),
          entities: [Expense],
          synchronize: !isProd, // ❌ nunca true en producción
          ssl: isProd
            ? {
                rejectUnauthorized: false,
              }
            : false,
        };
      },
    }),

    ExpensesModule,
  ],
})
export class AppModule {}




import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpensesModule } from './expenses/expenses.module';

@Module({
  imports: [
    // Carga variables de entorno (Railway)
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // TypeORM usando DATABASE_URL (Railway)
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        autoLoadEntities: true,
        synchronize: true, // ⚠️ solo para desarrollo
        ssl: {
          rejectUnauthorized: false,
        },
      }),
    }),

    ExpensesModule,
  ],
})
export class AppModule {}



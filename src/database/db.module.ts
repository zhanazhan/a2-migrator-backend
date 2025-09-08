import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CONNECTIONS } from '@/database/db-connection-names';

import { Complex, ComplexSchema } from '@/database/entities/complex';
import { Flat, FlatSchema } from '@/database/entities/flat';

import { Rent, RentSchema } from '@/database/entities/rent';
import { ComplexDbService } from '@/database/services/complex-db.service';
import { FlatsDBService } from '@/database/services/flats-db.service';
import { RentDbService } from '@/database/services/rent-db.service';
import { PostgresFlatsService } from '@/database/services/flats-posgresql.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlatEntity } from '@/database/entities';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Flat.name, schema: FlatSchema }],
      CONNECTIONS.SCRAPER,
    ),
    MongooseModule.forFeature(
      [{ name: Rent.name, schema: RentSchema }],
      CONNECTIONS.SCRAPER,
    ),
    MongooseModule.forFeature(
      [{ name: Complex.name, schema: ComplexSchema }],
      CONNECTIONS.SCRAPER,
    ),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('POSTGRES_HOST'),
        port: configService.get<number>('POSTGRES_PORT'),
        username: configService.get<string>('POSTGRES_USER'),
        password: configService.get<string>('POSTGRES_PASSWORD'),
        database: configService.get<string>('POSTGRES_DB'),
        entities: [FlatEntity],
        synchronize: false,
      }),
    }),
    TypeOrmModule.forFeature([FlatEntity]),
  ],
  providers: [
    FlatsDBService,
    RentDbService,
    ComplexDbService,
    PostgresFlatsService,
  ],
  exports: [
    FlatsDBService,
    RentDbService,
    ComplexDbService,
    PostgresFlatsService,
  ],
})
export class DBModule {}

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
    TypeOrmModule.forFeature([FlatEntity], CONNECTIONS.POSTGRES),
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

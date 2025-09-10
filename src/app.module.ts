import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { MongooseModule } from '@nestjs/mongoose';

import { CONNECTIONS } from '@/database/db-connection-names';
import { DBModule } from '@/database/db.module';
import { SecretsValidationSchema } from '@/libs/secrets/schema';
import { ComplexesModule } from '@/modules/complex/complexes.module';
import { MonitoringModule } from '@/modules/monitoring/monitoring.module';
import { RentsModule } from '@/modules/rents/rents.module';

import { FlatsModule } from './modules/flats/flats.module';
import { MigratorModule } from '@/modules/migrator/migrator.module';
import { HealthController } from '@/app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlatEntity } from '@/database/entities';
import { RegionsModule } from '@/modules/regions/regions.module';

@Module({
  controllers: [HealthController],
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
      validationSchema: SecretsValidationSchema,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const uri = configService.get<string>('MONGODB_SCRAPER_URI');
        console.log(`uri: ${uri}`);
        return {
          uri,
          family: 4, // Forces IPv4
          onConnectionCreate: (connection) => {
            console.log(
              `${CONNECTIONS.SCRAPER} connection created successfully: ${connection.readyState}`,
            );
          },
        };
      },
      inject: [ConfigService],
      connectionName: CONNECTIONS.SCRAPER,
    }),
    TypeOrmModule.forRootAsync({
      name: CONNECTIONS.POSTGRES,
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
        schema: configService.get<string>('POSTGRES_SCHEMA'),
        synchronize: true,
      }),
    }),
    DBModule,
    FlatsModule,
    RentsModule,
    ComplexesModule,
    MonitoringModule,
    MigratorModule,
    RegionsModule,
  ],
})
export class AppModule {}

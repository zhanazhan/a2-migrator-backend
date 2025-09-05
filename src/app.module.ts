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
import {MigratorModule} from "@/modules/migrator/migrator.module";

@Module({
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
    DBModule,
    FlatsModule,
    RentsModule,
    ComplexesModule,
    MonitoringModule,
    MigratorModule,
  ],
})
export class AppModule {}

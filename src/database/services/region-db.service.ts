import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CONNECTIONS } from '@/database/db-connection-names';
import { Region } from '@/database/entities/region';

import { MongooseService } from '../db.service';

@Injectable()
export class RegionDbService extends MongooseService<Region> {
  constructor(
    @InjectModel(Region.name, CONNECTIONS.SCRAPER)
    protected model: Model<Region>,
  ) {
    super(model);
  }
}

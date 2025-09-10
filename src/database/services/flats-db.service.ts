import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CONNECTIONS } from '@/database/db-connection-names';
import { MongooseService } from '@/database/db.service';
import { Flat } from '@/database/entities/flat';

@Injectable()
export class FlatsDBService extends MongooseService<Flat> {
  constructor(
    @InjectModel(Flat.name, CONNECTIONS.SCRAPER) public model: Model<Flat>,
  ) {
    super(model);
  }
}

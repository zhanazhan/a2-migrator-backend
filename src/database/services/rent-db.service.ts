import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CONNECTIONS } from '@/database/db-connection-names';
import { MongooseService } from '@/database/db.service';
import { Rent } from '@/database/entities/rent';

@Injectable()
export class RentDbService extends MongooseService<Rent> {
  constructor(
    @InjectModel(Rent.name, CONNECTIONS.SCRAPER) protected model: Model<Rent>,
  ) {
    super(model);
  }
}

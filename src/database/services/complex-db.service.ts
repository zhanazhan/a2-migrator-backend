import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CONNECTIONS } from '@/database/db-connection-names';
import { Complex } from '@/database/entities/complex';

import { MongooseService } from '../db.service';

@Injectable()
export class ComplexDbService extends MongooseService<Complex> {
  constructor(
    @InjectModel(Complex.name, CONNECTIONS.SCRAPER)
    protected model: Model<Complex>,
  ) {
    super(model);
  }
}

import { Injectable } from '@nestjs/common';
import { RentDbService } from '@/database/services/rent-db.service';

@Injectable()
export class RentsService {
  constructor(private service: RentDbService) {}

  get db() {
    return this.service.db;
  }
}

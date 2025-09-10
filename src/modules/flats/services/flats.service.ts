import { Injectable } from '@nestjs/common';

import { FlatsDBService } from '@/database/services/flats-db.service';

@Injectable()
export class FlatsService {
  constructor(private service: FlatsDBService) {}

  get model() {
    return this.service.model;
  }
}

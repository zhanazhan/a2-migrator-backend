import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Flat, FlatEntity } from '@/database/entities';
import { CONNECTIONS } from '@/database/db-connection-names'; // Mongo model

@Injectable()
export class PostgresFlatsService {
  constructor(
    @InjectRepository(FlatEntity, CONNECTIONS.POSTGRES)
    private readonly flatsRepo: Repository<FlatEntity>,
  ) {}

  async deleteAll(): Promise<void> {
    await this.flatsRepo.query(
      `TRUNCATE TABLE "flats" RESTART IDENTITY CASCADE`,
    );
  }

  async bulkInsert(batch: Flat[]) {
    const entities = batch.map((doc) => {
      const entity = new FlatEntity();

      entity.title = doc.title;
      entity.address = doc.fullAddress; // name mismatch
      entity.placementDate = doc.placementDate;
      entity.publishedBy = doc.publishedBy;
      entity.map = doc.map as any;
      entity.category = doc.category as any;
      entity.roomCount = doc.roomCount;
      entity.daysInLive = doc.daysInLive;
      entity.addedAt = doc.addedAt;
      entity.createdAt = doc.createdAt;
      entity.adNumber = doc.adNumber;
      entity.city = doc.city;
      entity.district = doc.district;
      entity.regionAlias = this.detectCity(doc);
      entity.houseType = doc.houseType;
      entity.residentialComplex = doc.residentialComplex;
      entity.residentialComplexId = doc.residentialComplexId;
      entity.constructionYear = doc.constructionYear;
      entity.floor = doc.floor;
      entity.totalFloors = doc.totalFloors;
      entity.area = doc.area;
      entity.condition = doc.condition;
      entity.cost = doc.cost;
      entity.bathroomCount = doc.bathroomCount;
      entity.balcony = doc.balcony;
      entity.parking = doc.parking;
      entity.furnished = doc.furnished;
      entity.floorCovering = doc.floorCovering;
      entity.ceilings = doc.ceilings;
      entity.security = doc.security;
      entity.formerDormitory = doc.formerDormitory;
      entity.description = doc.description;
      entity.scrapedAt = doc.scrapedAt;

      if (doc.statistics) {
        entity.currentFlat = doc.statistics.currentFlat;
        entity.similarFlatsArea = doc.statistics.similarFlatsArea;
        entity.similarFlatsCity = doc.statistics.similarFlatsCity;
        entity.similarFlatsAreaDifference =
          doc.statistics.similarFlatsAreaDifference;
      }
      // console.log(doc);
      // console.log(entity);
      return entity;
    });

    // ✅ Perform UPSERT by adNumber
    await this.flatsRepo.upsert(entities, ['adNumber']);
  }

  private detectCity(doc: Flat) {
    return '';
  }
}

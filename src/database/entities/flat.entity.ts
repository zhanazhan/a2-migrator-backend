import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'flats' })
export class FlatEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  title: string;

  @Column({ name: 'address', nullable: true })
  address: string;

  @Column({ name: 'placement_date', type: 'timestamp', nullable: true })
  placementDate: Date;

  @Column({ name: 'published_by', nullable: true })
  publishedBy: string;

  @Column({ type: 'jsonb', nullable: true })
  map: Record<string, any>;

  @Column({ type: 'jsonb', nullable: true })
  category: Record<string, any>;

  @Column({ name: 'room_count', nullable: true })
  roomCount: number;

  @Column({ name: 'days_in_live', nullable: true })
  daysInLive: number;

  @Column({ name: 'added_at', type: 'timestamp', nullable: true })
  addedAt: Date;

  @Column({ name: 'created_at', type: 'timestamp', nullable: true })
  createdAt: Date;

  @Column({ name: 'ad_number', nullable: true })
  adNumber: number;

  @Column({ name: 'regionalias', nullable: true })
  regionAlias: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  district: string;

  @Column({ name: 'house_type', nullable: true })
  houseType: string;

  @Column({ name: 'residential_complex', nullable: true })
  residentialComplex: string;

  @Column({ name: 'residential_complex_class', nullable: true })
  residentialComplexClass: string;

  @Column({ name: 'residential_complex_id', nullable: true })
  residentialComplexId: number;

  @Column({ name: 'construction_year', nullable: true })
  constructionYear: number;

  @Column({ nullable: true })
  floor: number;

  @Column({ name: 'total_floors', nullable: true })
  totalFloors: number;

  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: true })
  area: number;

  @Column({ nullable: true })
  condition: string;

  @Column({ type: 'float8', nullable: true })
  cost: number;

  @Column({ name: 'bathroom_count', nullable: true })
  bathroomCount: number;

  @Column({ nullable: true })
  balcony: boolean;

  @Column({ nullable: true })
  parking: boolean;

  @Column({ nullable: true })
  furnished: boolean;

  @Column({ name: 'floor_covering', nullable: true })
  floorCovering: string;

  @Column({ nullable: true })
  ceilings: string;

  @Column({ nullable: true })
  security: string;

  @Column({ name: 'former_dormitory', nullable: true })
  formerDormitory: boolean;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ name: 'scraped_at', type: 'timestamp', nullable: true })
  scrapedAt: Date;

  // statistics
  @Column({ name: 'current_flat', type: 'float8', nullable: true })
  currentFlat: number;

  @Column({ name: 'similar_flats_area', type: 'float8', nullable: true })
  similarFlatsArea: number;

  @Column({ name: 'similar_flats_city', type: 'float8', nullable: true })
  similarFlatsCity: number;

  @Column({
    name: 'similar_flats_area_difference',
    type: 'float8',
    nullable: true,
  })
  similarFlatsAreaDifference: number;
}

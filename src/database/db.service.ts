import { NotFoundException } from '@nestjs/common';
import { Document, Model, FilterQuery } from 'mongoose';

export class MongooseService<T extends Document> {
  constructor(protected model: Model<T>) {}

  get db() {
    return this.model;
  }

  async create(item: Partial<T>): Promise<T> {
    delete item.id;
    const createdItem = new this.model(item);
    return createdItem.save();
  }

  async update(id: string, item: Partial<T>): Promise<T> {
    const dbItem = await this.findById(id);
    if (dbItem.id !== item.id) {
      throw new NotFoundException(
        `Document with id ${id} does not match document that is being updated`,
      );
    }
    Object.assign(dbItem, item);
    return dbItem.save();
  }

  async findById(id: string): Promise<T> {
    const document = await this.model.findById(id).exec();
    if (!document) {
      throw new NotFoundException(`Document with id ${id} not found`);
    }
    return document;
  }

  async findOne(
    filter: FilterQuery<T>,
    throwOnNotFound: boolean = true,
  ): Promise<T> {
    const document = await this.model.findOne(filter).exec();
    if (throwOnNotFound && !document) {
      throw new NotFoundException(
        `Document with filter ${JSON.stringify(filter)} not found`,
      );
    }
    return document;
  }

  async find(filter: FilterQuery<T>): Promise<T[]> {
    const document = await this.model.find(filter).exec();
    if (!document) {
      return [];
    }
    return document;
  }

  async findAll(
    pageIndex: number = 1,
    pageSize: number = 10,
    sortProp: string = 'createdAt',
    sortDirection: string = 'asc',
  ): Promise<{ data: T[]; total: number }> {
    const skip = (pageIndex - 1) * pageSize;
    const sortOrder = sortDirection === 'asc' ? 1 : -1;

    const data = await this.model
      .find()
      .sort({ [sortProp]: sortOrder })
      .skip(skip)
      .limit(pageSize)
      .exec();

    const total = await this.model.countDocuments().exec();

    return { data, total };
  }

  async insertMany(items: T[]): Promise<T[]> {
    return this.model.insertMany(items);
  }

  public safeSave(doc: Partial<T>): void {
    this.model.create(doc).catch((err) => {
      console.error('Non-blocking save failed: ', err);
    });
  }
}

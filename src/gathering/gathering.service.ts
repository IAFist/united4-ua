import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GatheringDto } from './dto/gathering.dto';
import { Gathering, GatheringDocument } from './schemas/gathering.shema';

@Injectable()
export class GatheringService {
  constructor(
    @InjectModel('Gathering') private readonly gatheringModel: Model<Gathering>,
  ) {}

  async create(createGatheringDto: GatheringDto): Promise<GatheringDocument> {
    const newGathering = new this.gatheringModel(createGatheringDto);
    return newGathering.save();
  }

  async findAll(): Promise<GatheringDocument[]> {
    return this.gatheringModel.find().populate('user').populate('product').exec();
  }

  async findById(id: string): Promise<GatheringDocument> {
    const gathering = await this.gatheringModel.findById(id).populate('user').populate('product').exec();
    if (!gathering) {
      throw new NotFoundException(`Gathering with ID ${id} not found`);
    }
    return gathering;
  }

  async update(id: string, updateGatheringDto: GatheringDto): Promise<GatheringDocument> {
    const updatedGathering = await this.gatheringModel
      .findByIdAndUpdate(id, updateGatheringDto, { new: true })
      .populate('user')
      .populate('product')
      .exec();
    if (!updatedGathering) {
      throw new NotFoundException(`Gathering with ID ${id} not found`);
    }
    return updatedGathering;
  }

  async delete(id: string): Promise<void> {
    const result = await this.gatheringModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Gathering with ID ${id} not found`);
    }
  }
}

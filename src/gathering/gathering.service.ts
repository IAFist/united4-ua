import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { GatheringDto } from './dto/gathering.dto';
import { Gathering, GatheringDocument } from './schemas/gathering.shema';
import { UpdateGatheringDto } from './dto/updategathering.dto';

@Injectable()
export class GatheringService {
  constructor(
    @InjectModel('Gathering') private readonly gatheringModel: Model<Gathering>,
  ) {}

  async create(
    createGatheringDto: GatheringDto,
    userId: Types.ObjectId,
    file: Express.Multer.File,
  ): Promise<GatheringDocument> {
    if (file) {
      const filename = file.filename;
      createGatheringDto.img = filename;
    }
    const newGathering = new this.gatheringModel({
      user: userId,
      ...createGatheringDto,
    });
    return newGathering.save();
  }

  async updateRating(id: Types.ObjectId, newRating: number) {
    return this.gatheringModel
      .findByIdAndUpdate(
        id,
        {
          rating: newRating,
        },
        { new: true },
      )
      .exec();
  }

  async getGatheringsByUser(
    userId: Types.ObjectId,
  ): Promise<GatheringDocument[]> {
    return await this.gatheringModel
      .find({ user: userId })
      .exec();
  }

  async findAll(): Promise<GatheringDocument[]> {
    const gatherings = await this.gatheringModel
      .find()
      .populate('user')
      .exec();

    const updatedGatherings = gatherings.map(gathering => {
      if (gathering.img) {
        gathering.img = `http://26.122.74.29:4200/uploads/${gathering.img}`;
      }
      return gathering;
    });

    return updatedGatherings;
  }

  async findById(id: string): Promise<GatheringDocument> {
    const gathering = await this.gatheringModel
      .findById(id)
      .populate('user')
      .exec();
    if (!gathering) {
      throw new NotFoundException(`Gathering with ID ${id} not found`);
    }
    return gathering;
  }

  async update(
    id: string,
    updateGatheringDto: UpdateGatheringDto,
  ): Promise<GatheringDocument> {
    const existingGathering = await this.gatheringModel.findById(id);
  
    if (!existingGathering) {
      throw new NotFoundException(`Gathering with ID ${id} not found`);
    }
  
    const newSum = existingGathering.currentSum + updateGatheringDto.currentSum;
  
    const updatedGathering = await this.gatheringModel
      .findByIdAndUpdate(id, { currentSum: newSum }, { new: true });
  
    console.log(id, updateGatheringDto.currentSum);
  
    return updatedGathering;
  }

  async delete(id: string): Promise<void> {
    const result = await this.gatheringModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Gathering with ID ${id} not found`);
    }
  }
}

import {
    BadRequestException,
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
  import { InjectModel } from '@nestjs/mongoose';
  import { Model, Types } from 'mongoose';
  import { UserService } from 'src/user/user.service';
  import { VolonteerDto } from './dto/volonteer.dto';
  import { Volonteer, VolonteerDocument } from './schemas/volonteer.schema';
  
  @Injectable()
  export class VolonteerService {
    constructor(
      @InjectModel(Volonteer.name)
      private readonly volonteerModel: Model<Volonteer>,
      private readonly userService: UserService,
    ) {}
  
    async create(
      dto: VolonteerDto,
      userId: string,
    ): Promise<VolonteerDocument> {
  
      const newVolonteer = await this.volonteerModel.create({
        name: dto.name,
        userId: userId,
      });
  
      const user = await this.userService.findOneById(userId);
      user.isDistributor = true;
      user.save();
  
      return newVolonteer.save();
    }
  
    async update(
      dto: VolonteerDto,
      id: Types.ObjectId,
    ): Promise<VolonteerDocument> {
      const updateDoc = await this.volonteerModel
        .findByIdAndUpdate(id, dto, { new: true })
        .exec();
  
      if (!updateDoc) throw new NotFoundException('Volonteer not found');
  
      return updateDoc;
    }
  
    async delete(id: Types.ObjectId) {
      const deleteDoc = await this.volonteerModel.findByIdAndDelete(id).exec();
      if (!deleteDoc) throw new NotFoundException('Volonteer not found');
  
      return deleteDoc;
    }
  }
  
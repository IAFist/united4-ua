import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UserService } from 'src/user/user.service';
import { UpdateDistributorDto } from './dto/update-distributor.dto';
import { Distributor, DistributorDocument } from './schemas/distributor.schema';

@Injectable()
export class DistributorService {
  constructor(
    @InjectModel(Distributor.name)
    private readonly distributorModel: Model<Distributor>,
    private readonly userService: UserService,
  ) {}

  async create(
    dto: UpdateDistributorDto,
    userId: string,
  ): Promise<DistributorDocument> {
    const oldDistributor = await this.distributorModel.findOne({
      edrpou: dto.edrpou,
    });

    if (oldDistributor)
      throw new BadRequestException(
        `A Distributor with this edrpou has already existed in the system `,
      );

    const newDistributor = await this.distributorModel.create({
      edrpou: dto.edrpou,
      name: dto.name,
      userId: userId,
    });

    const user = await this.userService.findOneById(userId);
    user.isDistributor = true;
    user.save();

    return newDistributor.save();
  }

  async update(
    dto: UpdateDistributorDto,
    id: Types.ObjectId,
  ): Promise<DistributorDocument> {
    const updateDoc = await this.distributorModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();

    if (!updateDoc) throw new NotFoundException('Distributor not found');

    return updateDoc;
  }

  async delete(id: Types.ObjectId) {
    const deleteDoc = await this.distributorModel.findByIdAndDelete(id).exec();
    if (!deleteDoc) throw new NotFoundException('Distributor not found');

    return deleteDoc;
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from 'src/user/user.service';
import { CreateDistributorDto } from './dto/create-distributor.dto';
import { Distributor, DistributorDocument } from './schemas/distributor.schema';

@Injectable()
export class DistributorService {
  constructor(
    @InjectModel(Distributor.name)
    private readonly distributorModel: Model<Distributor>,
    private readonly userService: UserService,
  ) {}

  async create(
    dto: CreateDistributorDto,
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
}

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
import { TelegramService } from 'src/telegram/telegram.service'

@Injectable()
export class DistributorService {
  constructor(
    @InjectModel(Distributor.name) private readonly distributorModel: Model<Distributor>,
    private readonly userService: UserService,
    private readonly telegramService: TelegramService
  ) {}

  async create(
    dto: UpdateDistributorDto,
    userId: string,
    photoUrl: string,
  ): Promise<void> {
    const oldDistributor = await this.distributorModel.findOne({
      edrpou: dto.edrpou,
    });

    if (oldDistributor)
      throw new BadRequestException(
        `A Distributor with this edrpou has already existed in the system `,
      );

    const user = await this.userService.findOneById(userId);

    await this.telegramService.sendPhoto(photoUrl);

    const msg = `<b>User Information:</b>\n
                 Name: ${user.userName}\n
                 Email: ${user.email}\n
                 EDRPOU: ${dto.edrpou}\n
                 Distributor Name: ${dto.name}`;

    await this.telegramService.sendMessage(msg, {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: 'Підтвердити',
                callback_data: 'confirm_distributor',
              },
              {
                text: 'Скасувати',
                callback_data: 'cancel_distributor',
              },
            ],
          ],
        },
    });
  }

  async handleConfirmation(
    distributorData: { edrpou: string, name: string },
    userId: string,
  ): Promise<DistributorDocument> {
    const { edrpou, name } = distributorData;

    const user = await this.userService.findOneById(userId);

    const newDistributor = await this.distributorModel.create({
      edrpou,
      name,
      userId,
    });

    user.isDistributor = true;
    await user.save();

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

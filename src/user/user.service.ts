import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from './schemas/user.schema';
import { AuthDto } from 'src/auth/dto/auth.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findOneByEmail(email: string): Promise<UserDocument | undefined> {
    return this.userModel.findOne({ email }).exec();
  }

  async findOneById(id: string): Promise<UserDocument | undefined> {
    return this.userModel.findById(id).exec();
  }

  async createUser(dto: AuthDto): Promise<UserDocument> {
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const newUser = new this.userModel({
      email: dto.email,
      password: hashedPassword,
      userName: dto.userName,
      isAdmin: false,
      isVolonteer: false,
      isDistributor: false,
    });

    return newUser.save();
  }
}

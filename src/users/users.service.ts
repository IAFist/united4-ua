import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from './schemas/user.schema';
import { AuthDto } from 'src/auth/dto/auth.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findOneByEmail(email: string): Promise<UserDocument | undefined> {
    return this.userModel.findOne({ email }).exec();
  }

  async createUser(dto: AuthDto): Promise<UserDocument> {
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const newUser = new this.userModel({
      email: dto.email,
      password: hashedPassword,
      userName: dto.userName,
      isAdmin: false,
      isVolonteer: false,
    });

    return newUser.save();
  }
}

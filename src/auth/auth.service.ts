import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';
import { AuthDto } from './dto/auth.dto';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import { RefreshTokenDto } from './dto/refreshToken.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TelegramService } from 'src/telegram/telegram.service'

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly telegramService: TelegramService
  ) {}

  async validateUser(email: string, password: string): Promise<UserDocument> {
    const user = await this.userService.findOneByEmail(email);
    if (!user) throw new UnauthorizedException('User not found');

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) throw new UnauthorizedException('Invalid password');

    return user;
  }

  async login(dto: AuthDto) {
    const user = await this.validateUser(dto.email, dto.password);

    const tokens = await this.issueTokenPair(String(user._id));

    return {
      user: {
        _id: user._id,
        email: user.email,
        userName: user.userName,
        isAdmin: user.isAdmin,
        isVolonteer: user.isVolonteer,
        isDistributor: user.isDistributor,
      },
      ...tokens,
    };
  }

  async getNewTokens({ refreshToken }: RefreshTokenDto) {
    if (!refreshToken) throw new UnauthorizedException('Please sign in');

    const result = await this.jwtService.verifyAsync(refreshToken);
    if (!result) throw new UnauthorizedException('Invalid token or expired');

    const user = await this.userModel.findById(result._id);

    const tokens = await this.issueTokenPair(String(user._id));

    return {
      user: {
        _id: user._id,
        email: user.email,
        userName: user.userName,
        isAdmin: user.isAdmin,
        isVolonteer: user.isVolonteer,
        isDistributor: user.isDistributor,
      },
      ...tokens,
    };
  }

  async sendNotification(email) {
		await this.telegramService.sendPhoto(
			'https://bipbap.ru/wp-content/uploads/2017/04/0_7c779_5df17311_orig.jpg'
		)

		const msg = `<b>${email}</b>`

		await this.telegramService.sendMessage(msg, {
			reply_markup: {
				inline_keyboard: [
					[
						{
							url: 'https://okko.tv/movie/free-guy',
							text: 'Go to watch',
						},
					],
				],
			},
		})
	}

  async register(dto: AuthDto) {
    const oldUser = await this.userService.findOneByEmail(dto.email);

    if (oldUser)
      throw new BadRequestException(
        `A User with this email has already existed in the system `,
      );

    const user = await this.userService.createUser(dto);

    const tokens = await this.issueTokenPair(String(user._id));

    return {
      user: {
        _id: user._id,
        email: user.email,
        userName: user.userName,
        isAdmin: user.isAdmin,
        isVolonteer: user.isVolonteer,
        isDistributor: user.isDistributor,
      },
      ...tokens,
    };
  }

  async issueTokenPair(userId: string) {
    const data = { _id: userId };

    const refreshToken = await this.jwtService.signAsync(data, {
      expiresIn: '15d',
    });

    const accessToken = await this.jwtService.signAsync(data, {
      expiresIn: '1h',
    });

    return { refreshToken, accessToken };
  }
}

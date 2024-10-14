import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { AuthDto } from './dto/auth.dto';
import { UserDocument } from 'src/users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<UserDocument> {
    const user = await this.usersService.findOneByEmail(email);
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
      },
      ...tokens,
    };
  }

  async register(dto: AuthDto) {
    const oldUser = await this.usersService.findOneByEmail(dto.email);

    if (oldUser)
      throw new BadRequestException(
        `A User with this email has already existed in the system `,
      );

    const user = await this.usersService.createUser(dto);

    const tokens = await this.issueTokenPair(String(user._id));

    return {
      user: {
        _id: user._id,
        email: user.email,
        userName: user.userName,
        isAdmin: user.isAdmin,
        isVolonteer: user.isVolonteer,
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

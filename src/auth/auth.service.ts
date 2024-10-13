import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user._id, isAdmin: user.isAdmin, isVolonteer: user.isVolonteer };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(email: string, password: string, userName: string, isAdmin: boolean = false, isVolonteer: boolean = false) {
    return this.usersService.createUser(email, password, userName, isAdmin, isVolonteer);
  }
}

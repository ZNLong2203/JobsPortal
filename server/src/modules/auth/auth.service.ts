import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findUserByEmail(username);
    if (user && compare(password, user.password)) {
      return true;
    }
    return null;
  }

  async register(user: any) {
    return this.usersService.createUser(user);
  }

  async login(user: any) {
    const payload = { _id: user._id, gmail: user.gmail };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

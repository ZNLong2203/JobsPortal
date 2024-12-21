import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { IJwtPayload } from './interfaces/jwt-payload.interface';

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

  async login(user: IJwtPayload) {
    const { _id, name, gmail, role } = user;
    const payload = {
      sub: 'auth',
      iss: 'from zkare',
      _id,
      name,
      gmail,
      role,
    };
    return {
      access_token: this.jwtService.sign(payload),
      userData: {
        _id,
        name,
        gmail,
        role,
      },
    };
  }
}

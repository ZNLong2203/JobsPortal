import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    console.log('validateUser');
    return true;
  }

  async register(user: any) {
    return this.usersService.create(user);
  }

  async login(user: any) {
    const payload = { _id: user._id, gmail: user.gmail };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

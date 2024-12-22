import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Message } from 'src/common/message';
import { LoginRequestDto } from './dto/login-request.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findUserByEmail(email);

    if (user && compare(password, user.password)) {
      return user;
    }
    throw new UnauthorizedException(Message.INVALID_CREDENTIALS);
  }

  async register(createUser: CreateUserDto): Promise<void> {
    await this.usersService.createUser(createUser);
    return;
  }

  async login(loginRequest: LoginRequestDto): Promise<any> {
    const validateUser = await this.validateUser(
      loginRequest.email,
      loginRequest.password,
    );

    const { _id, name, email, role } = validateUser;
    const payload = {
      sub: 'auth',
      iss: 'from zkare',
      _id,
      name,
      email,
      role,
    };

    return {
      access_token: this.jwtService.sign(payload),
      userData: {
        _id,
        name,
        email,
        role,
      },
    };
  }
}

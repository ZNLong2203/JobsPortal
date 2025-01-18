import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { Response } from 'express';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Message } from 'src/common/message';
import { ConfigService } from '@nestjs/config';
import { IUser } from '../users/interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findUserByEmail(email);
    const checkPassword = await compare(password, user.password);

    if (user && checkPassword) {
      return user;
    }
    throw new UnauthorizedException(Message.INVALID_CREDENTIALS);
  }

  async register(createUser: CreateUserDto): Promise<void> {
    try {
      const checkUser = await this.usersService.findUserByEmailForCheckExist(
        createUser.email,
      );
      if (checkUser) {
        throw new BadRequestException(Message.EMAIL_ALREADY_EXISTS);
      }

      await this.usersService.createUser(createUser);
      return;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async login(user: IUser, res: Response): Promise<any> {
    try {
      const { _id, name, email, role, company } = user;
      const payload = {
        sub: 'auth',
        iss: 'from zkare',
        _id,
        name,
        email,
        role,
        company,
      };

      const refreshExpire =
        this.configService.get<string>('JWT_REFRESH_EXPIRE');
      if (!refreshExpire) {
        throw new InternalServerErrorException(
          'JWT_REFRESH_EXPIRE is not defined',
        );
      }

      const refreshToken = this.jwtService.sign(payload, {
        secret: this.configService.get<string>('JWT_REFRESH_TOKEN'),
        expiresIn: refreshExpire,
      });

      res.clearCookie('refreshToken');
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
      });

      return {
        access_token: this.jwtService.sign(payload),
        userInfo: {
          _id,
          name,
          email,
          role,
          company,
          avatar: user.avatar,
        },
      };
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  async newRefreshToken(refreshToken: string, res: Response): Promise<any> {
    try {
      const payload = this.jwtService.verify(refreshToken);
      const user = await this.usersService.findUserByEmail(payload.email);

      if (!user) {
        throw new UnauthorizedException(Message.INVALID_CREDENTIALS);
      }

      const { _id, name, email, role, company } = user;
      const newPayload = {
        sub: 'auth',
        iss: 'from zkare',
        _id,
        name,
        email,
        role,
        company,
      };

      res.clearCookie('refreshToken');
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
      });

      return {
        access_token: this.jwtService.sign(newPayload),
        userInfo: {
          _id,
          name,
          email,
          role,
          company,
          avatar: user.avatar,
        },
      };
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}

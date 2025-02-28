import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
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
    try {
      const user = await this.usersService.findUserByEmail(email);
      if (!user) {
        throw new UnauthorizedException(Message.INVALID_CREDENTIALS);
      }

      const checkPassword = await compare(password, user.password);
      if (!checkPassword) {
        throw new UnauthorizedException(Message.INVALID_CREDENTIALS);
      }

      return user;
    } catch (error) {
      console.error('User validation error:', error);
      throw new UnauthorizedException(Message.INVALID_CREDENTIALS);
    }
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
        secure: process.env.NODE_ENV !== 'development',
        sameSite: process.env.NODE_ENV === 'development' ? 'lax' : 'none',
        maxAge: 30 * 24 * 60 * 60 * 1000,
        path: '/',
      });

      // Create user profile
      const userProfile = await this.usersService.findUserProfile(_id);
      if (!userProfile) {
        await this.usersService.createUserProfile(_id);
      }

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
        secure: process.env.NODE_ENV !== 'development',
        sameSite: process.env.NODE_ENV === 'development' ? 'lax' : 'none',
        maxAge: 30 * 24 * 60 * 60 * 1000,
        path: '/',
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

  async googleLogin(user: any, res: Response): Promise<any> {
    try {
      const { email, name, photo } = user;
      const checkUser =
        await this.usersService.findUserByEmailForCheckExist(email);
      if (!checkUser) {
        const createUser: CreateUserDto = {
          email,
          name,
          password: '',
          avatar: photo,
          loginProvider: 'google',
        };
        await this.usersService.createUser(createUser);
      }

      const existingUser = await this.usersService.findUserByEmail(email);
      const loginData = await this.login(existingUser, res);
      return loginData;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async githubLogin(user: any, res: Response): Promise<any> {
    try {
      const { displayName, emails, avatar } = user;
      const email = emails[0].value;
      const checkUser =
        await this.usersService.findUserByEmailForCheckExist(email);
      if (!checkUser) {
        const createUser: CreateUserDto = {
          email,
          name: displayName,
          password: '',
          avatar,
          loginProvider: 'github',
        };
        await this.usersService.createUser(createUser);
      }

      const existingUser = await this.usersService.findUserByEmail(email);
      const loginData = await this.login(existingUser, res);
      return loginData;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}

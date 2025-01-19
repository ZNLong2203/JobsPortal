import {
  Controller,
  Post,
  UseGuards,
  Body,
  Request,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { Public } from '../../decorators/public.decorator';
import { Message } from 'src/common/message';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('/register')
  async register(@Body() createUser: CreateUserDto) {
    await this.authService.register(createUser);

    return {
      message: Message.REGISTER_SUCCESS,
    };
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req: any, @Res({ passthrough: true }) res: Response) {
    const loginUser = await this.authService.login(req.user, res);

    return {
      message: Message.LOGIN_SUCCESS,
      data: loginUser,
    };
  }

  @Public()
  @Post('/refresh-token')
  async newRefreshToken(
    @Request() req: any,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshToken = req.cookies.refreshToken;
    const loginUser = await this.authService.newRefreshToken(refreshToken, res);

    return {
      message: Message.LOGIN_SUCCESS,
      data: loginUser,
    };
  }

  @Post('/logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('refreshToken');

    return {
      message: Message.LOGOUT_SUCCESS,
    };
  }
}

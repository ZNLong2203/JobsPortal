import {
  Controller,
  Post,
  UseGuards,
  Body,
  Request,
  Res,
  Get,
} from '@nestjs/common';
import { Response } from 'express';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { Public } from '../../decorators/public.decorator';
import { Message } from 'src/common/message';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private configService: ConfigService) {}

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

  // Google login
  @Public()
  @Get('/google')
  @UseGuards(AuthGuard('google'))
  async googleLogin() {}

  @Public()
  @Get('/google/callback')
  @UseGuards(AuthGuard('google'))
  async googleLoginCallback(
    @Request() req: any,
    @Res() res: Response,
  ) {
    try {
      const loginUser = await this.authService.googleLogin(req.user, res);
      const encodedData = encodeURIComponent(JSON.stringify(loginUser));
      return res.redirect(`${this.configService.get<string>('CLIENT_URL')}/auth/callback?provider=google&data=${encodedData}`);
    } catch (error) {
      return res.redirect(`${this.configService.get<string>('CLIENT_URL')}/auth/login?error=${encodeURIComponent(error.message)}`);
    }
  }

  // Github login
  @Public()
  @Get('github')
  @UseGuards(AuthGuard('github'))
  async githubLogin() {}

  @Public()
  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  async githubLoginCallback(
    @Request() req: any,
    @Res() res: Response,
  ) {
    try {
      const loginUser = await this.authService.githubLogin(req.user, res);
      const encodedData = encodeURIComponent(JSON.stringify(loginUser));
      return res.redirect(`${this.configService.get<string>('CLIENT_URL')}/auth/callback?provider=github&data=${encodedData}`);
    } catch (error) {
      return res.redirect(`${this.configService.get<string>('CLIENT_URL')}/auth/login?error=${encodeURIComponent(error.message)}`);
    }
  }
}

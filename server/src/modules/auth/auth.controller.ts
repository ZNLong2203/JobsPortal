import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { Public } from '../../decorators/public.decorator';
import { Message } from 'src/common/message';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('/register')
  async register(@Request() req) {
    const registerUser = await this.authService.register(req.body);
    return {
      message: Message.REGISTER_SUCCESS,
      data: registerUser,
    };
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    const loginUser = await this.authService.login(req.user);
    return {
      message: Message.LOGIN_SUCCESS,
      data: loginUser,
    };
  }
}

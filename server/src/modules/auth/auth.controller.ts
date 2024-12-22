import { Controller, Post, UseGuards, Body, Request } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { Public } from '../../decorators/public.decorator';
import { Message } from 'src/common/message';
import { CreateUserDto } from '../users/dto/create-user.dto';

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
  async login(@Request() req: any) {
    const loginUser = await this.authService.login(req.user);

    return {
      message: Message.LOGIN_SUCCESS,
      data: loginUser,
    };
  }
}

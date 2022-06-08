import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UserEntity } from 'src/user/user.entity';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  //login, register
  @Post('resgister')
  async register(@Body() user: UserEntity): Promise<any> {
    const result = await this.authService.register(user);
    if (result.user) {
      return { message: 'register failed!' };
    }
    return { message: 'register successfull' };
  }
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() user: UserEntity): Promise<UserEntity> {
    return await this.authService.login(user);
  }
}

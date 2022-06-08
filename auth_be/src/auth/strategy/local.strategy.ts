import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UserService } from '../../user/user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {
    super();
  }
  async validate(username: string, password: string): Promise<any> {
    console.log('local validate', username, password);
    const validUser = await this.userService.validateUser(username, password);
    if (!validUser.user) {
      throw new UnauthorizedException();
    }
    console.log('valid user :', validUser.user);
    return validUser.user;
  }
}

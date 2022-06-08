import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly User: Repository<UserEntity>,
    private readonly userSevice: UserService,
    private jwtService: JwtService,
  ) {}
  async register(user: UserEntity): Promise<any> {
    console.log('register in auth service');
    const userValid = await this.userSevice.validateUser(
      user.username,
      user.password,
    );

    if (userValid.user !== null) {
      return userValid;
    }
    return this.userSevice.postNewUser(user);
  }
  async login(user: UserEntity): Promise<any> {
    console.log('login service!');
    const payload = {
      username: user.username,
      id: user.id,
      password: user.password,
    };
    const access_token = this.jwtService.sign(payload);
    return {
      user: { ...payload, access_token: access_token },
    };
  }
  async refreshToken(): Promise<any> {
    const access_token = this.jwtService.sign('meo');
    return {
      user: { access_token: access_token },
    };
  }
}

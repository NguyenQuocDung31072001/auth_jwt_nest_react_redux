import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userSevice: UserService) {}
  @Get()
  findAllUser(): Promise<UserEntity[]> {
    return this.userSevice.getAllUser();
  }
  @Get(':id')
  findOneUser(@Param() params): Promise<UserEntity> {
    return this.userSevice.getOneUser(params.id);
  }
  @Post()
  postNewUser(@Body() user: UserEntity): Promise<UserEntity> {
    return this.userSevice.postNewUser(user);
  }
  @Put()
  updateUser(@Body() user: UserEntity): Promise<any> {
    return this.userSevice.updateUser(user);
  }
  @Delete(':id')
  deleteUser(@Param() params): Promise<any> {
    return this.userSevice.deleteUser(params.id);
  }
}

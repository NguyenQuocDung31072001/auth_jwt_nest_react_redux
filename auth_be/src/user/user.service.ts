import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}
  //getAllUser, getOneUser, postNewUser, updateUser, deleteUser
  async getAllUser(): Promise<UserEntity[]> {
    return await this.userRepo.find();
  }
  async getOneUser(id: number): Promise<UserEntity> {
    return await this.userRepo.findOne({ where: { id: id } });
  }
  async postNewUser(user: UserEntity): Promise<UserEntity> {
    console.log('post new user');
    return await this.userRepo.save(user);
  }
  async updateUser(user: UserEntity): Promise<UpdateResult> {
    return await this.userRepo.update(user.id, user);
  }
  async deleteUser(id: number): Promise<DeleteResult> {
    return await this.userRepo.delete(id);
  }
  async validateUser(username: string, password: string) {
    try {
      const validUser = await this.userRepo.findOne({
        where: { username: username, password: password },
      });
      // console.log('valid user :', validUser);

      return { user: validUser };
    } catch (error) {}
  }
}

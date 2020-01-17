import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from '../common/entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  
  /**
   * 获取用户详情
   * @param id string
   */
  async getUser( id='all' ) {
    if(id==='all'){
      const allUsers = await this.userRepository.find();
      return {
        code: 10,
        message:"success",
        payload: allUsers
      }
    }
    const user = await this.userRepository.findOne({ userId: id });
    if(!user) {
      return {
        code: 400,
        message:"没有找到对应的用户",
        payload:{}
      };
    }
    return {
      code: 10,
      message:"success",
      payload: user
    }
  }

  /**
   * 创建用户
   * @param data obj
   */
  async createUser(data) {
    const findOne = await this.userRepository.findOne({ username: data.username });
    if(findOne){
      return {
        code: 400,
        message:"用户名重复",
        payload:{}
      }
    }
    this.userRepository.save(data);
    return {
      code: 10,
      message:"新增成功!",
      payload:{}
    }
  }

  /**
   * 根据用户id删除用户
   * @param id
   */
  async delUser(id) {
    const user = await this.userRepository.findOne({ userId: id });
    if(!user) {
      return {
        code: 400,
        message:"没有找到对应的用户",
        payload:{}
      };
    }
    this.userRepository.remove(user);
    return {
      code: 10,
      message:"删除成功!",
      payload:{}
    };
  }

  /**
   * 修改用户信息
   * @param id string
   * @param data obj
   */
  async updateUser(id, data) {
    let user = await this.userRepository.findOne({ userId: id });
    let has = await this.userRepository.findOne({ username: data.username });
    if(!user) {
      return {
        code: 400,
        message:"没有找到对应的用户",
        payload:{}
      };
    }
    if(has) {
      return {
        code: 400,
        message:"用户名重复",
        payload:{}
      };
    }
    user = Object.assign({},user, data);
    this.userRepository.save(user);
    return {
      code: 10,
      message:"修改成功!",
      payload:{}
    }
  }

}
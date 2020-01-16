import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  getUserInfo() {
    return 'hello';
  }

  @Post()
  async createUser(@Body() data) {
    return this.userService.createUser(data);
  }
}
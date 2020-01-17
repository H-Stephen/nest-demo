import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('users')
  getUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  getUser(@Param('id') id) {
    return this.userService.getUser(id);
  }

  @Post()
  async create(@Body() data) {
    return this.userService.createUser(data);
  }

  @Delete(":id")
  remove(@Param('id') id: string) {
    return this.userService.delUser(id);
  }

  @Put(":id")
  update(@Param('id') id: string, @Body() data) {
    return this.userService.updateUser(id, data);
  }
}
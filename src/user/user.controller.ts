import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("login")
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.login(createUserDto);
  }

  @Post("registration")
  rgistration(@Body() createUserDto: CreateUserDto) {
    return this.userService.registration(createUserDto);
  }

  @Get("getUserInfo")
  findAll(@Req() request:Request) {
    return this.userService.getUserInfo(request);
  }

  @Get('')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}

import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import mongoose from 'mongoose';
import { UpdateUserDto } from './dto/updateUser.dto';

@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) { }

  @Post()
  @UsePipes(new ValidationPipe())
  createUser(@Body() user: CreateUserDto) {

    return this.userService.createUser(user)
  }

  @Get()
  getUsers() {

    return this.userService.getUsers()
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {

    const isValid = mongoose.Types.ObjectId.isValid(id)

    if (!isValid) throw new HttpException('User not found', 404)

    const user = await this.userService.getUserById(id)

    if (!user) throw new HttpException('User not found', 404)

    return user
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async updateUser(
    @Param('id') id: string,
    @Body() values: UpdateUserDto
  ) {
    const isValid = mongoose.Types.ObjectId.isValid(id)

    if (!isValid) throw new HttpException('Invalid ID', 400)

    const updatedUser= await this.userService.updateUser(id, values)

    if(!updatedUser) throw new HttpException('User not found', 404)

    return updatedUser
  }


  @Delete(':id')
  async removeUser(@Param('id')id: string) {

    const isValid = mongoose.Types.ObjectId.isValid(id)

    if (!isValid) throw new HttpException('Invalid ID', 400)

    const deletedUser= await this.userService.removeUser(id)

    if(!deletedUser) throw new HttpException('User not found', 404)

    return 
  }
}

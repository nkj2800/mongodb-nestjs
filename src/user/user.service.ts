import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/User.schema';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UserService {

  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  createUser(createUserDto: CreateUserDto) {
    const newUser = new this.userModel(createUserDto)

    return newUser.save()
  }

  getUsers() {
    return this.userModel.find()
  }

  getUserById(id: string) {
    return this.userModel.findById(id)
  }

  updateUser(id: string, values: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, values, { new: true })
  }

  removeUser(id: string) {
    return this.userModel.findByIdAndDelete(id)
  }
}

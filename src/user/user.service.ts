import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/User.schema';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserSettings } from 'src/schemas/UserSettings.schema';

@Injectable()
export class UserService {

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(UserSettings.name) private userSettingsModel: Model<UserSettings>
  ) { }

  async createUser({ settings, ...createUserDto }: CreateUserDto) {
    if (settings) {
      const newSettings = new this.userSettingsModel(settings)
      console.log(newSettings)
      const savedNewSettings = await newSettings.save()
      const newUser = new this.userModel({
        ...createUserDto,
        settings: savedNewSettings._id
      })

      return newUser.save()
    }

    const newUser = new this.userModel(createUserDto)

    return newUser.save()
  }

  getUsers() {
    return this.userModel.find().populate('settings')
  }

  getUserById(id: string) {
    return this.userModel.findById(id).populate('settings')
  }

  updateUser(id: string, values: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, values, { new: true })
  }

  removeUser(id: string) {
    return this.userModel.findByIdAndDelete(id)
  }
}

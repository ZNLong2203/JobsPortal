import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model, Types } from 'mongoose';
import { hashSync, genSalt } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(createUserDto: CreateUserDto) {
    const salt = await genSalt(10);
    const hashedPassword = hashSync(createUserDto.password, salt);
    const newUser = await this.userModel.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return newUser;
  }

  async findAllUser() {
    const allUsers = await this.userModel.find();
    return allUsers;
  }

  async findUserById(id: number) {
    if (!Types.ObjectId.isValid(id)) {
      return null;
    }

    const user = await this.userModel.findById(id);
    return user;
  }

  async findUserByEmail(email: string) {
    const user = this.userModel.findOne({ email });
    if (!user) return null;
    return user;
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        ...updateUserDto,
      },
      {
        new: true,
      },
    );
    return updatedUser;
  }

  async deleteUser(id: number) {
    await this.userModel.findByIdAndDelete(id);
    return;
  }
}

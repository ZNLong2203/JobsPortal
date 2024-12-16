import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { hashSync, genSalt } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(createUserDto: CreateUserDto) {
    const salt = await genSalt(10);
    const hashedPassword = hashSync(createUserDto.password, salt);
    const newUser = this.userModel.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return newUser;
  }

  async findAll() {
    return `This action returns all users`;
  }

  async findUser(id: number) {
    return `This action returns a #${id} user`;
  }

  async findUserByEmail(email: string) {
    const user = this.userModel.findOne({ email });
    if (!user) return null;
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user with ${updateUserDto}`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

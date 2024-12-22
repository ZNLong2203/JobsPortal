import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model, Types } from 'mongoose';
import { hashSync, genSalt } from 'bcrypt';
import { Message } from 'src/common/message';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const salt = await genSalt(10);
    const hashedPassword = hashSync(createUserDto.password, salt);
    const newUser = await this.userModel.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return newUser;
  }

  async findAllUser(): Promise<User[]> {
    const allUsers = await this.userModel.find();
    return allUsers;
  }

  async findUserById(id: Types.ObjectId): Promise<User> {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error(Message.INVALID_ID);
    }

    const user = await this.userModel.findById(id);
    return user;
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email });
    if (!user) throw new Error(Message.USER_NOT_FOUND);

    return user;
  }

  async updateUser(
    id: Types.ObjectId,
    updateUserDto: UpdateUserDto,
  ): Promise<void> {
    await this.userModel.findByIdAndUpdate(
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

    return;
  }

  async deleteUser(id: Types.ObjectId): Promise<void> {
    await this.userModel.findByIdAndDelete(id);
    return;
  }
}

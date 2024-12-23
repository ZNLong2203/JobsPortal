import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model, Types } from 'mongoose';
import { hashSync, genSalt } from 'bcrypt';
import { Message } from 'src/common/message';
import { IReqUser } from '../auth/interfaces/req-user.interface';
import { UserDto } from './dto/user.dto';
import { IUser } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserDto> {
    const salt = await genSalt(10);
    const hashedPassword = hashSync(createUserDto.password, salt);
    const newUser = await this.userModel.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return newUser;
  }

  async createUserByAdmin(
    createUserDto: CreateUserDto,
    user: IReqUser,
  ): Promise<UserDto> {
    const salt = await genSalt(10);
    const hashedPassword = hashSync(createUserDto.password, salt);
    const newUser = await this.userModel.create({
      ...createUserDto,
      password: hashedPassword,
      createdBy: user._id,
    });
    return newUser;
  }

  async findAllUser(page: number, limit: number, query: any): Promise<any> {
    const skip = (page - 1) * limit;
    const [users, totalDocuments] = await Promise.all([
      this.userModel.find(query).skip(skip).limit(limit),
      this.userModel.countDocuments(query),
    ]);

    const totalPages = Math.ceil(totalDocuments / limit);

    return {
      users,
      metadata: {
        total: totalDocuments,
        page,
        totalPages,
        limit,
      },
    };
  }

  async findUserById(id: Types.ObjectId): Promise<UserDto> {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error(Message.INVALID_ID);
    }

    const user = await this.userModel.findById(id);
    return user;
  }

  // This methods is use to return all user data for login
  async findUserByEmail(email: string): Promise<IUser> {
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

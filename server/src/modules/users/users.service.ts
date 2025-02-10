import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model, Types } from 'mongoose';
import { hashSync, genSalt } from 'bcrypt';
import { Message } from 'src/common/message';
import { IReqUser } from '../auth/interfaces/req-user.interface';
import { IUser } from './interfaces/user.interface';
// import { IUser } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      const salt = await genSalt(10);
      const hashedPassword = hashSync(createUserDto.password, salt);
      const newUser = await this.userModel.create({
        ...createUserDto,
        password: hashedPassword,
      });

      return newUser;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async createUserByAdmin(
    createUserDto: CreateUserDto,
    user: IReqUser,
  ): Promise<User> {
    try {
      const salt = await genSalt(10);
      const hashedPassword = hashSync(createUserDto.password, salt);
      const newUser = await this.userModel.create({
        ...createUserDto,
        password: hashedPassword,
        company: user.company,
        createdBy: user._id,
      });

      return newUser;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAllUser(page: number, limit: number, query: any): Promise<any> {
    try {
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
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findUserById(id: Types.ObjectId): Promise<User> {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new Error(Message.INVALID_ID);
      }

      const user = await this.userModel.findById(id);
      if (!user) throw new NotFoundException(Message.USER_NOT_FOUND);

      return user;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findAllHR(user: IReqUser): Promise<User[]> {
    try {
      const users = await this.userModel.find({
        role: 'hr',
        company: user.company,
      }).select('-password').lean();

      return users;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  // This methods is use to return all user data for login
  async findUserByEmail(email: string): Promise<IUser> {
    try {
      const user = await this.userModel.findOne({ email });
      if (!user) throw new NotFoundException(Message.USER_NOT_FOUND);

      return user;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findUserByEmailForCheckExist(email: string): Promise<User> {
    try {
      const user = await this.userModel.findOne({
        email,
      });
      return user;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async getTotalUsers(): Promise<number> {
    try {
      const totalUsers = await this.userModel.countDocuments();
      return totalUsers;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async updateUser(
    id: Types.ObjectId,
    updateUserDto: UpdateUserDto,
  ): Promise<void> {
    try {
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
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async removeUser(id: Types.ObjectId): Promise<void> {
    try {
      await this.userModel.findByIdAndDelete(id);
      return;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}

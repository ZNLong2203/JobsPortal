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
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { UserProfile } from './schemas/user-profile.schema';
import { ProfileFieldEnum } from './dto/remove-user-profile.dto';
// import { IUser } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(UserProfile.name) private userProfileModel: Model<UserProfile>,
  ) {}

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
      const users = await this.userModel
        .find({
          role: 'hr',
          company: user.company,
        })
        .select('-password')
        .lean();

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
  ): Promise<User> {
    try {
      const updatedUser = await this.userModel
        .findByIdAndUpdate(id, updateUserDto, { new: true })
        .select('-password')
        .lean();

      return updatedUser;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateUserProfile(
    id: Types.ObjectId,
    updateUserProfileDto: UpdateUserProfileDto,
  ) {
    try {
      const checkProfile = await this.userModel.findById(id);

      if (!checkProfile.profile) {
        const newProfile = await this.userProfileModel.create(updateUserProfileDto);
        const updatedUser = await this.userModel.findByIdAndUpdate(
          {
            _id: id,
          },
          {
            profile: newProfile._id,
          },
          {
            new: true,
          },
        );

        return updatedUser;
      } 
      else {
        const updatedProfile = await this.userProfileModel.findByIdAndUpdate(
          checkProfile.profile,
          updateUserProfileDto,
          {
            new: true,
          }
        )

        return updatedProfile;
      }
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

  async removeUserProfile(
    id: Types.ObjectId,
    field: ProfileFieldEnum,
    itemId?: string
  ): Promise<void> {
    try {
      const user = await this.userModel.findById(id);
      if (!user || !user.profile) {
        throw new NotFoundException(Message.USER_NOT_FOUND);
      }

      const updateQuery: any = {};

      switch (field) {
        case ProfileFieldEnum.EXPERIENCE:
          if (itemId) {
            updateQuery.$pull = { experience: { _id: new Types.ObjectId(itemId) } };
          } else {
            updateQuery.$set = { experience: [] };
          }
          break;

        case ProfileFieldEnum.EDUCATION:
          if (itemId) {
            updateQuery.$pull = { education: { _id: new Types.ObjectId(itemId) } };
          } else {
            updateQuery.$set = { education: [] };
          }
          break;

        case ProfileFieldEnum.CERTIFICATIONS:
          updateQuery.$set = { certifications: [] };
          break;

        case ProfileFieldEnum.SKILLS:
          updateQuery.$set = { skills: [] };
          break;

        case ProfileFieldEnum.LANGUAGES:
          updateQuery.$set = { languages: [] };
          break;

        default:
          throw new BadRequestException(Message.INVALID_FIELD);
      }

      const result = await this.userProfileModel.updateOne(
        { _id: user.profile },
        updateQuery
      );

      if (result.modifiedCount === 0) {
        throw new NotFoundException(Message.USER_PROFILE_FIELD_NOT_FOUND);
      }
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(`Failed to remove ${field}: ${error.message}`);
    }
  }
}

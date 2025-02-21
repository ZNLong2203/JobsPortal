import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Subscriber, SubscriberDocument } from './schemas/subscriber.schema';
import { Model, Types } from 'mongoose';
import { IReqUser } from '../auth/interfaces/req-user.interface';

@Injectable()
export class SubscribersService {
  constructor(
    @InjectModel(Subscriber.name)
    private subscriberModel: Model<SubscriberDocument>,
  ) {}

  async createSubscriber(
    createSubscriberDto: CreateSubscriberDto,
    user: IReqUser,
  ): Promise<Subscriber> {
    try {
      const checkExistingSubscriber = await this.subscriberModel.findOne({
        email: user.email,
      });

      if (checkExistingSubscriber) {
        throw new BadRequestException('Subscriber already exists');
      }

      const createdSubscriber =
        await this.subscriberModel.create(createSubscriberDto);

      return createdSubscriber;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAllSubscriber(): Promise<any> {
    try {
      const allSubscribers = await this.subscriberModel.find();

      return allSubscribers;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findOneSubscriber(id: Types.ObjectId): Promise<Subscriber> {
    try {
      const subscriber = await this.subscriberModel.findById(id);

      if (!subscriber) {
        throw new NotFoundException('Subscriber not found');
      }

      return subscriber;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async updateSubscriber(
    id: Types.ObjectId,
    updateSubscriberDto: UpdateSubscriberDto,
  ): Promise<Subscriber> {
    try {
      const updatedSubscriber = await this.subscriberModel.findByIdAndUpdate(
        id,
        updateSubscriberDto,
        { new: true },
      );

      if (!updatedSubscriber) {
        throw new NotFoundException('Subscriber not found');
      }

      return updatedSubscriber;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async removeSubscriber(id: Types.ObjectId): Promise<void> {
    try {
      const deletedSubscriber =
        await this.subscriberModel.findByIdAndDelete(id);

      if (!deletedSubscriber) {
        throw new NotFoundException('Subscriber not found');
      }

      return;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}

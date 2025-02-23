import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SubscribersService } from './subscribers.service';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';
import { ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { Message } from 'src/common/message';
import { IReqUser } from '../auth/interfaces/req-user.interface';
import { User } from 'src/decorators/user.decorator';

@ApiTags('subscribers')
@Controller('subscribers')
export class SubscribersController {
  constructor(private readonly subscribersService: SubscribersService) {}

  @Post()
  async createSubscriber(
    @Body() createSubscriberDto: CreateSubscriberDto,
    @User() user: IReqUser,
  ) {
    const newSubscriber = await this.subscribersService.createSubscriber(
      createSubscriberDto,
      user,
    );

    return {
      message: Message.SUBSCRIBER_CREATED,
      data: newSubscriber,
    };
  }

  @Get()
  async findAllSubscriberByUser(@User() user: IReqUser) {
    const allSubscribers =
      await this.subscribersService.findAllSubscriberByUser(user);

    return {
      message: Message.SUBSCRIBER_ALL_FETCHED,
      data: allSubscribers,
    };
  }

  @Get('/:id')
  async findOneSubscriber(@Param('id') id: Types.ObjectId) {
    const subscriber = await this.subscribersService.findOneSubscriber(id);

    return {
      message: Message.SUBSCRIBER_FETCHED,
      data: subscriber,
    };
  }

  @Patch('/:id')
  async updateSubscriber(
    @Param('id') id: Types.ObjectId,
    @Body() updateSubscriberDto: UpdateSubscriberDto,
  ) {
    const updatedSubscriber = await this.subscribersService.updateSubscriber(
      id,
      updateSubscriberDto,
    );

    return {
      message: Message.SUBSCRIBER_UPDATED,
      data: updatedSubscriber,
    };
  }

  @Delete('/:id')
  async removeSubscriber(@Param('id') id: Types.ObjectId) {
    await this.subscribersService.removeSubscriber(id);

    return {
      message: Message.SUBSCRIBER_DELETED,
    };
  }
}

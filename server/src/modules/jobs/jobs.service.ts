import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { JobDto } from './dto/job.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Job, JobDocument } from './schemas/job.schema';
import { Model, Types } from 'mongoose';
import { IReqUser } from '../auth/interfaces/req-user.interface';
import { Message } from 'src/common/message';

@Injectable()
export class JobsService {
  constructor(@InjectModel(Job.name) private jobModel: Model<JobDocument>) {}

  async createJob(createJobDto: CreateJobDto, user: IReqUser): Promise<JobDto> {
    const newJob = await this.jobModel.create({
      ...createJobDto,
      createdBy: user._id,
    });

    return newJob;
  }

  async findAllJob(page: number, limit: number, query: any): Promise<any> {
    const skip = (page - 1) * limit;
    const [jobs, totalDocuments] = await Promise.all([
      this.jobModel.find(query).skip(skip).limit(limit),
      this.jobModel.countDocuments(query),
    ]);

    const totalPages = Math.ceil(totalDocuments / limit);

    return {
      jobs,
      metadata: {
        total: totalDocuments,
        page,
        totalPages,
        limit,
      },
    };
  }

  async findOneJob(id: Types.ObjectId): Promise<JobDto> {
    const job = await this.jobModel.findById(id);
    if (!job) throw new BadRequestException(Message.JOB_NOT_FOUND);

    return job;
  }

  async updateJob(
    id: Types.ObjectId,
    updateJobDto: UpdateJobDto,
  ): Promise<void> {
    await this.jobModel.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        ...updateJobDto,
      },
      {
        new: true,
      },
    );

    return;
  }

  async removeJob(id: Types.ObjectId, user: IReqUser): Promise<void> {
    const checkJob = await this.jobModel.findById(id);

    if (checkJob.createdBy.toString() !== user._id.toString()) {
      throw new BadRequestException(Message.JOB_NOT_YOURS);
    }

    await this.jobModel.findByIdAndDelete(id);

    return;
  }
}

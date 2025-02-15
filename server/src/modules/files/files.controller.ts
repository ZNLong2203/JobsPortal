import { ApiTags } from '@nestjs/swagger';
import { FileType } from 'src/common/constants';
import { Controller, HttpStatus, ParseFilePipeBuilder, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Message } from 'src/common/message';

@ApiTags('files')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload/resume')
  @UseInterceptors(FileInterceptor('file'))
  async uploadResume(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'application/pdf|application/msword|application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        })
        .addMaxSizeValidator({
          maxSize: 5 * 1024 * 1024, // 5MB
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
  ) {
    const fileData = await this.filesService.uploadFile(
      file.buffer,
      file.originalname,
      FileType.RESUME
    );

    return {
      message: Message.FILE_RESUME_UPLOADED,
      data: {
        url: fileData.secure_url,
        publicId: fileData.public_id,
      }
    };
  }

  @Post('upload/company-image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadCompanyImage(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'image/jpeg|image/png|image/svg+xml',
        })
        .addMaxSizeValidator({
          maxSize: 2 * 1024 * 1024, // 2MB
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
  ) {
    const fileData = await this.filesService.uploadFile(
      file.buffer,
      file.originalname,
      FileType.COMPANY_IMAGE
    );

    return {
      message: Message.FILE_COMPANY_IMAGE_UPLOADED,
      data: {
        url: fileData.secure_url,
        publicId: fileData.public_id,
      }
    };
  }

  @Post('upload/avatar')
  @UseInterceptors(FileInterceptor('file'))
  async uploadAvatar(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'image/jpeg|image/png',
        })
        .addMaxSizeValidator({
          maxSize: 1 * 1024 * 1024, // 1MB
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
  ) {
    const fileData = await this.filesService.uploadFile(
      file.buffer,
      file.originalname,
      FileType.USER_AVATAR
    );

    return {
      message: Message.FILE_USER_AVATAR_UPLOADED,
      data: {
        url: fileData.secure_url,
        publicId: fileData.public_id,
      }
    };
  }
}
import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  ParseFilePipeBuilder,
  HttpStatus,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType:
            'image/jpeg|image/png|image/svg+xml|text/plain|application/pdf|application/msword|application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        })
        .addMaxSizeValidator({
          maxSize: 5 * 1024 * 1024,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
  ) {
    if (!file) {
      return { message: 'File not uploaded' };
    }

    const fileData = await this.filesService.uploadFile(
      file.buffer,
      file.originalname,
    );
    const resultData = {
      url: fileData.secure_url,
      publicId: fileData.public_id,
    };

    return {
      message: 'File uploaded successfully',
      data: resultData,
    };
  }
}

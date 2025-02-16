import { Inject, Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { FileType } from 'src/common/constants';

@Injectable()
export class FilesService {
  constructor(@Inject('CLOUDINARY') private readonly cloudinary) {}

  private getUploadConfig(fileType: FileType, fileName: string) {
    const configs = {
      [FileType.RESUME]: {
        folder: 'jobsportal/resumes',
        allowed_formats: ['pdf', 'doc', 'docx'],
        resource_type: 'raw' as const,
      },
      [FileType.COMPANY_IMAGE]: {
        folder: 'jobsportal/companies',
        allowed_formats: ['jpg', 'jpeg', 'png', 'svg'],
        resource_type: 'image' as const,
      },
      [FileType.USER_AVATAR]: {
        folder: 'jobsportal/avatars',
        allowed_formats: ['jpg', 'jpeg', 'png'],
        transformation: [{ width: 400, height: 400, crop: 'fill' }],
        resource_type: 'image' as const,
      },
    };

    return {
      ...configs[fileType],
      public_id: fileName,
    };
  }

  async uploadFile(
    fileBuffer: Buffer,
    fileName: string,
    fileType: FileType,
  ): Promise<UploadApiResponse> {
    const config = this.getUploadConfig(fileType, fileName);

    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(config, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        })
        .end(fileBuffer);
    });
  }
}

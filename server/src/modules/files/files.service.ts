import { Inject, Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

@Injectable()
export class FilesService {
  constructor(@Inject('CLOUDINARY') private readonly cloudinary) {}

  async uploadFile(
    fileBuffer: Buffer,
    fileName?: string,
  ): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: 'nestjs_uploads',
            public_id: fileName,
            resource_type: 'auto',
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          },
        )
        .end(fileBuffer); // Pass the buffer to the stream
    });
  }
}

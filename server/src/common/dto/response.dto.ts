import { Message } from '../message';
import { PaginationDto } from './pagination.dto';

export default class ResponseDto<T = null> {
  data: T | null;
  message: Message | string;
  success: boolean;
  statusCode?: number;
  pageInfo?: Omit<PaginationDto<T>, 'data'>;

  constructor(
    data: T | null,
    message: Message | string,
    success: boolean,
    statusCode?: number,
  ) {
    this.data = data instanceof PaginationDto ? (data.data as T) : data;
    this.message = message;
    this.success = success;
    this.statusCode = statusCode;

    if (data instanceof PaginationDto) {
      this.pageInfo = {
        total: data.total,
        offset: data.offset,
        limit: data.limit,
      };
    }
  }

  static success<T>(
    data: T,
    message: Message | string = 'Operation successful',
    statusCode: number = 200,
  ) {
    return new ResponseDto<T>(data, message, true, statusCode);
  }

  static error<T>(
    data: T | null,
    message: Message | string = 'An error occurred',
    statusCode: number = 400,
  ) {
    return new ResponseDto<T>(data, message, false, statusCode);
  }

  static successWithoutData(
    message: Message | string = 'Operation successful',
    statusCode: number = 200,
  ) {
    return new ResponseDto<null>(null, message, true, statusCode);
  }

  static errorWithoutData(
    message: Message | string = 'An error occurred',
    statusCode: number = 400,
  ) {
    return new ResponseDto<null>(null, message, false, statusCode);
  }

  static successDefault<T>(data: T) {
    return ResponseDto.success(data, 'Success', 200);
  }

  static errorDefault<T>(data: T) {
    return ResponseDto.error(data, 'Error', 400);
  }
}

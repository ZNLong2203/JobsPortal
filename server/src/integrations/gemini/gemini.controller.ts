import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { GeminiService } from './gemini.service';
import { GetAIMessageDTO } from './dto/get-ai-response.dto';
import { Public } from 'src/decorators/public.decorator';

@Controller('gemini')
export class GeminiController {
  constructor(private readonly geminiService: GeminiService) {}

  @Public()
  @Post()
  async getMessages(@Body() data: GetAIMessageDTO) {
    return this.geminiService.generateMessage(data);
  }
}

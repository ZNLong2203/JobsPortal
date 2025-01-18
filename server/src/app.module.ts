import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { JobsModule } from './modules/jobs/jobs.module';
import { CompanyModule } from './modules/company/company.module';
import { FilesModule } from './modules/files/files.module';
import { ResumesModule } from './modules/resumes/resumes.module';
import { PermissionsModule } from './modules/permissions/permissions.module';
import { RolesModule } from './modules/roles/roles.module';
import { StatisticsModule } from './modules/statistics/statistics.module';
import { RedisModule } from './integrations/redis/redis.module';
import { GeminiModule } from './integrations/gemini/gemini.module';
import { KafkaModule } from './integrations/kafka/kafka.module';
import * as mongooseDelete from 'mongoose-delete';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URL'),
        connectionFactory: (connection) => {
          connection.plugin(mongooseDelete, {
            deletedAt: true,
            overrideMethods: 'all',
          });
          return connection;
        },
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    CompanyModule,
    JobsModule,
    FilesModule,
    ResumesModule,
    PermissionsModule,
    RolesModule,
    StatisticsModule,
    // RedisModule,
    // KafkaModule,
    GeminiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    TaskModule,
    UsersModule,
    AuthModule, 
    ConfigModule.forRoot({ isGlobal: true }), 
    JwtModule, 
    PrismaModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

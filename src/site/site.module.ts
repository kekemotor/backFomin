import { Module } from '@nestjs/common';
import { SiteService } from './site.service';
import { SiteController } from './site.controller';
import { PrismaService } from '../prismaService';
import { JwtModule } from '@nestjs/jwt';
@Module({
  controllers:[SiteController],
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [SiteService, PrismaService],
})
export class SiteModule {}

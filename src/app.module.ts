import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { SiteModule } from './site/site.module';

@Module({
  imports: [UserModule, SiteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

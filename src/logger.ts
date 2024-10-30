// src/middlewares/responseLogger.middleware.ts

import { Injectable, Request, Response } from '@nestjs/common';

@Injectable()
export class ResponseLoggerMiddleware {
  private readonly logger = [];

  async use(req: Request, res: any, next: any) {
    
  }

  getLogger() {
    return this.logger;
  }
}
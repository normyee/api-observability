import { Injectable, OnModuleInit } from '@nestjs/common';
import client from 'prom-client';

@Injectable()
export class MetricClient implements OnModuleInit {
  onModuleInit() {
    client.collectDefaultMetrics();
  }

  get contentType() {
    return client.register.contentType;
  }

  async getMetrics() {
    return await client.register.metrics();
  }
}

import { BaseMetadata } from "./BaseMetadata";

export class BaseResponse<T> {
  data: T;
  metadata: BaseMetadata;

  constructor(data: T) {
    this.data = data;
    this.metadata = { timestamp: new Date().toISOString() };
  }
} 
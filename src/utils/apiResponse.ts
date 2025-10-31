// src/utils/ApiResponse.ts
export interface ApiResponsePayload<T = any> {
  success: boolean;
  message: string;
  data?: T | null;
}

export class ApiResponse<T = any> {
  success = true;
  message: string;
  data?: T | null;
  statusCode?: number;

  constructor(message: string, data?: T | null, statusCode?: number) {
    this.message = message;
    this.data = data ?? null;
    if (statusCode) this.statusCode = statusCode;
  }

  // helper factory to create with status
  static withStatus<T = any>(message: string, data?: T | null, statusCode = 200) {
    return new ApiResponse<T>(message, data ?? null, statusCode);
  }

  toJSON(): ApiResponsePayload<T> {
    return {
      success: this.success,
      message: this.message,
      data: this.data ?? null,
    };
  }
}

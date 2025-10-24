export interface ValidationError {
  field: string;
  message: string;
  code?: string;
}

export interface GenericResponse<T> {
  isSuccess: boolean;
  message: string;
  value?: T;
  valueList?: T[];
  errorCode?: string;
  validationErrors?: ValidationError[];
  timestamp: string;
  requestId?: string;
}

export interface GenericResponseNoData {
  isSuccess: boolean;
  message: string;
  errorCode?: string;
  validationErrors?: ValidationError[];
  timestamp: string;
  requestId?: string;
}

// Helper functions for working with GenericResponse
export class GenericResponseHelper {
  static isSuccess<T>(response: GenericResponse<T>): boolean {
    return response.isSuccess;
  }

  static getData<T>(response: GenericResponse<T>): T | undefined {
    return response.value;
  }

  static getDataList<T>(response: GenericResponse<T>): T[] | undefined {
    return response.valueList;
  }

  static getMessage<T>(response: GenericResponse<T>): string {
    return response.message;
  }

  static getValidationErrors<T>(response: GenericResponse<T>): ValidationError[] {
    return response.validationErrors || [];
  }

  static hasValidationErrors<T>(response: GenericResponse<T>): boolean {
    return !!(response.validationErrors && response.validationErrors.length > 0);
  }

  static getErrorCode<T>(response: GenericResponse<T>): string | undefined {
    return response.errorCode;
  }
}

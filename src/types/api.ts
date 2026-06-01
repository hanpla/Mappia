export interface ApiResponse<T = null> {
  success: boolean;
  message: string;
  code: string;
  data: T;
}

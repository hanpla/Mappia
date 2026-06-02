export interface ApiResponse<T = undefined> {
  success: boolean;
  message: string;
  code: string;
  data?: T;
}

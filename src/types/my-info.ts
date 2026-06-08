export interface UpdateMyInfoRequest {
  nickname?: string;
  profileImageUrl?: string;
  newPassword?: string;
}

export interface ProfileImageUploadResponse {
  profileImageUrl: string;
}

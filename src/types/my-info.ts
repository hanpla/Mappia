export interface UpdateMyInfoRequest {
  nickname?: string;
  profileImageUrl?: string | null;
  newPassword?: string;
}

export interface ProfileImageUploadResponse {
  profileImageUrl: string;
}

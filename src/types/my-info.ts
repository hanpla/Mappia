export interface UpdateMyInfoRequest {
  nickname?: string;
  // null을 보내면 프로필 이미지를 초기화한다.
  profileImageUrl?: string | null;
  newPassword?: string;
}

export interface ProfileImageUploadResponse {
  profileImageUrl: string;
}

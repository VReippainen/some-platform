import { ProfileDto } from "../dtos/ProfileDto";
import { BaseResponse } from "./BaseResponse";

export class ProfileResponse extends BaseResponse<ProfileDto> {
  constructor(data: ProfileDto) {
    super(data);
  }
}

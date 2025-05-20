import { ProfileDto } from "../dtos/ProfileDto";
import { BaseResponse } from "./BaseResponse";

export class ProfilesResponse extends BaseResponse<ProfileDto[]> {
  constructor(data: ProfileDto[]) {
    super(data);
  }
}

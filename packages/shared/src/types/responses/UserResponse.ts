import { UserDto } from "../dtos/UserDto";
import { BaseResponse } from "./BaseResponse";

export class UserResponse extends BaseResponse<UserDto[]> {
  constructor(data: UserDto[]) {
    super(data);
  }
}

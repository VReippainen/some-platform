import { TokenDto } from "../dtos/TokenDto";
import { BaseResponse } from "./BaseResponse";

export class TokenResponse extends BaseResponse<TokenDto> {
  constructor(data: TokenDto) {
    super(data);
  }
}

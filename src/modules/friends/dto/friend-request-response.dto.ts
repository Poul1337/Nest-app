import { ApiProperty } from "@nestjs/swagger";
import { FriendRequestEnum } from "../enums/friend-request.enum";
import { SenderResponseDto } from "./sender-response.dto";

export class FriendRequestResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ type: () => SenderResponseDto })
  sender: SenderResponseDto;

  @ApiProperty({ enum: FriendRequestEnum })
  status: FriendRequestEnum;
}

import { ApiProperty } from "@nestjs/swagger";
import { FriendRequestEnum } from "../enums/friend-request.enum";

export class Sender {
  @ApiProperty()
  id: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;
}

export class FriendRequestResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  sender: Sender;

  @ApiProperty()
  status: FriendRequestEnum;
}

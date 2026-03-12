import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export class FriendRequestDto {
  @ApiProperty({
    description: "UUID of the user to send the friend request to",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  @IsUUID(4, { message: "receiver must be a valid UUID" })
  receiver: string;
}

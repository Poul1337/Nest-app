import { ApiProperty } from "@nestjs/swagger";

export class FriendResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;
}

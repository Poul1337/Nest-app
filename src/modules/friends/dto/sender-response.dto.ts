import { ApiProperty } from "@nestjs/swagger";

export class SenderResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;
}

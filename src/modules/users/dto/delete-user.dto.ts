import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUUID, MinLength } from "class-validator";

export class DeleteUserDto {
  @ApiProperty({ description: "User UUID" })
  @IsUUID(4, { message: "id must be a valid UUID" })
  id: string;

  @ApiProperty({
    example: "Haslo123!",
    description: "Current password to confirm deletion"
  })
  @IsString()
  @MinLength(8, { message: "password must be at least 8 characters" })
  password: string;
}

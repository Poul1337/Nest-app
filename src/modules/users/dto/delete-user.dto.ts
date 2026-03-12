import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";

export class DeleteUserDto {
  @ApiProperty({
    example: "Haslo123!",
    description: "Current password to confirm deletion",
  })
  @IsString()
  @MinLength(8, { message: "password must be at least 8 characters" })
  password: string;
}
